import { ForbiddenException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { Writable } from 'node:stream';
import { AUDIT_LOG_MAX_DURATION } from 'src/constants';
import { mapAlbum } from 'src/dtos/album.dto';
import { AssetResponseDto, mapAsset } from 'src/dtos/asset-response.dto';
import { AuthDto } from 'src/dtos/auth.dto';
import { AssetDeltaSyncDto, AssetDeltaSyncResponseDto, AssetFullSyncDto, SyncStreamDto } from 'src/dtos/sync.dto';
import { DatabaseAction, EntityType, Permission, SyncType } from 'src/enum';
import { SyncOptions } from 'src/interfaces/sync.interface';
import { BaseService } from 'src/services/base.service';
import { getMyPartnerIds } from 'src/utils/asset.util';
import { Paginated, usePagination } from 'src/utils/pagination';
import { setIsEqual } from 'src/utils/set';

const FULL_SYNC = { needsFullSync: true, deleted: [], upserted: [] };
const SYNC_PAGE_SIZE = 5000;

const asJsonLine = (item: unknown) => JSON.stringify(item) + '\n';

type StreamItemOptions<T, R> = {
  stream: Writable;
  type: SyncType;
  userId: string;
  lastAck?: string | null;
  load: (options: SyncOptions) => Paginated<T>;
  map: (item: T) => R;
};

const writeToStream = async <T, R = any>({ stream, type, userId, lastAck, load, map }: StreamItemOptions<T, R>) => {
  const pagination = usePagination(SYNC_PAGE_SIZE, (options) => load({ ...options, userId, lastAck }));
  for await (const items of pagination) {
    for (const item of items) {
      stream.write(asJsonLine({ type, data: map(item) }));
    }
  }
};

export class SyncService extends BaseService {
  async acknowledge(auth: AuthDto, dto: any) {
    const { id: sessionId } = this.assertSession(auth);
    await this.syncRepository.upsert({ ...dto, sessionId });
  }

  async stream(auth: AuthDto, stream: Writable, dto: SyncStreamDto) {
    const { id: sessionId } = this.assertSession(auth);
    const state = await this.syncRepository.get(sessionId);

    for (const type of dto.types) {
      const common = { stream, type, userId: auth.user.id };

      switch (type) {
        case SyncType.ASSET: {
          await writeToStream({
            ...common,
            lastAck: state?.assets,
            load: (options) => this.syncRepository.getAssets(options),
            map: (item) => mapAsset(item, { auth, stripMetadata: false }),
          });
          break;
        }

        case SyncType.ALBUM: {
          await writeToStream({
            ...common,
            lastAck: state?.albums,
            load: (options) => this.syncRepository.getAlbums(options),
            map: (item) => mapAlbum(item, false, auth),
          });
          break;
        }

        case SyncType.ALBUM_ASSET: {
          await writeToStream({
            ...common,
            lastAck: state?.albumAssets,
            load: (options) => this.syncRepository.getAlbumAssets(options),
            map: (item) => item,
          });
          break;
        }

        default: {
          this.logger.warn(`Unsupported sync type: ${type}`);
          break;
        }
      }
    }

    stream.end();
  }

  async getFullSync(auth: AuthDto, dto: AssetFullSyncDto): Promise<AssetResponseDto[]> {
    // mobile implementation is faster if this is a single id
    const userId = dto.userId || auth.user.id;
    await this.requireAccess({ auth, permission: Permission.TIMELINE_READ, ids: [userId] });
    const assets = await this.assetRepository.getAllForUserFullSync({
      ownerId: userId,
      updatedUntil: dto.updatedUntil,
      lastId: dto.lastId,
      limit: dto.limit,
    });
    return assets.map((a) => mapAsset(a, { auth, stripMetadata: false, withStack: true }));
  }

  async getDeltaSync(auth: AuthDto, dto: AssetDeltaSyncDto): Promise<AssetDeltaSyncResponseDto> {
    // app has not synced in the last 100 days
    const duration = DateTime.now().diff(DateTime.fromJSDate(dto.updatedAfter));
    if (duration > AUDIT_LOG_MAX_DURATION) {
      return FULL_SYNC;
    }

    // app does not have the correct partners synced
    const partnerIds = await getMyPartnerIds({ userId: auth.user.id, repository: this.partnerRepository });
    const userIds = [auth.user.id, ...partnerIds];
    if (!setIsEqual(new Set(userIds), new Set(dto.userIds))) {
      return FULL_SYNC;
    }

    await this.requireAccess({ auth, permission: Permission.TIMELINE_READ, ids: dto.userIds });

    const limit = 10_000;
    const upserted = await this.assetRepository.getChangedDeltaSync({ limit, updatedAfter: dto.updatedAfter, userIds });

    // too many changes, need to do a full sync
    if (upserted.length === limit) {
      return FULL_SYNC;
    }

    const deleted = await this.auditRepository.getAfter(dto.updatedAfter, {
      userIds,
      entityType: EntityType.ASSET,
      action: DatabaseAction.DELETE,
    });

    const result = {
      needsFullSync: false,
      upserted: upserted
        // do not return archived assets for partner users
        .filter((a) => a.ownerId === auth.user.id || (a.ownerId !== auth.user.id && !a.isArchived))
        .map((a) =>
          mapAsset(a, {
            auth,
            stripMetadata: false,
            // ignore stacks for non partner users
            withStack: a.ownerId === auth.user.id,
          }),
        ),
      deleted,
    };
    return result;
  }

  private assertSession(auth: AuthDto) {
    if (!auth.session?.id) {
      throw new ForbiddenException('This endpoint requires session-based authentication');
    }

    return auth.session;
  }
}
