import { AlbumAssetResponseDto } from 'src/dtos/album-asset.dto';
import { AlbumEntity } from 'src/entities/album.entity';
import { AssetEntity } from 'src/entities/asset.entity';
import { SessionSyncStateEntity } from 'src/entities/session-sync-state.entity';
import { Paginated, PaginationOptions } from 'src/utils/pagination';

export const ISyncRepository = 'ISyncRepository';

export type SyncState = Omit<SessionSyncStateEntity, 'session' | 'createdAt' | 'updatedAt'>;

export type SyncOptions = PaginationOptions & {
  userId: string;
  lastAck?: string | null;
};

export interface ISyncRepository {
  get(sessionId: string): Promise<SessionSyncStateEntity | null>;
  upsert(state: SyncState): Promise<void>;

  getAssets(options: SyncOptions): Paginated<AssetEntity>;
  getAlbums(options: SyncOptions): Paginated<AlbumEntity>;
  getAlbumAssets(options: SyncOptions): Paginated<AlbumAssetResponseDto>;
}
