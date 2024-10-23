import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumAssetResponseDto } from 'src/dtos/album-asset.dto';
import { AlbumEntity } from 'src/entities/album.entity';
import { AssetEntity } from 'src/entities/asset.entity';
import { SessionSyncStateEntity } from 'src/entities/session-sync-state.entity';
import { ISyncRepository, SyncOptions, SyncState } from 'src/interfaces/sync.interface';
import { Paginated } from 'src/utils/pagination';
import { Repository } from 'typeorm';

@Injectable()
export class SyncRepository implements ISyncRepository {
  constructor(@InjectRepository(SessionSyncStateEntity) private repository: Repository<SessionSyncStateEntity>) {}

  get(sessionId: string): Promise<SessionSyncStateEntity | null> {
    return this.repository.findOneBy({ sessionId });
  }

  async upsert(state: SyncState): Promise<void> {
    await this.repository.upsert(state, { conflictPaths: ['sessionId'] });
  }

  getAssets(options: SyncOptions): Paginated<AssetEntity> {
    return Promise.resolve({ items: [], hasNextPage: false });
  }

  getAlbums(options: SyncOptions): Paginated<AlbumEntity> {
    return Promise.resolve({ items: [], hasNextPage: false });
  }

  getAlbumAssets(options: SyncOptions): Paginated<AlbumAssetResponseDto> {
    return Promise.resolve({ items: [], hasNextPage: false });
  }
}
