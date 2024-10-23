import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ArrayNotEmpty, IsDateString, IsEnum, IsInt, IsPositive } from 'class-validator';
import { ActivityResponseDto } from 'src/dtos/activity.dto';
import { AlbumAssetResponseDto } from 'src/dtos/album-asset.dto';
import { AlbumResponseDto } from 'src/dtos/album.dto';
import { AssetResponseDto } from 'src/dtos/asset-response.dto';
import { MemoryResponseDto } from 'src/dtos/memory.dto';
import { PartnerResponseDto } from 'src/dtos/partner.dto';
import { PersonResponseDto } from 'src/dtos/person.dto';
import { SharedLinkResponseDto } from 'src/dtos/shared-link.dto';
import { StackResponseDto } from 'src/dtos/stack.dto';
import { UserResponseDto } from 'src/dtos/user.dto';
import { SyncType } from 'src/enum';
import { Optional, ValidateDate, ValidateUUID } from 'src/validation';

export class SyncAcknowledgeDto {
  @Optional()
  @IsDateString()
  assets?: string;

  @Optional()
  @IsDateString()
  albums?: string;

  @Optional()
  @IsDateString()
  albumAsset?: string;

  @Optional()
  @IsDateString()
  activities?: string;

  @Optional()
  @IsDateString()
  memories?: string;

  @Optional()
  @IsDateString()
  partners?: string;

  @Optional()
  @IsDateString()
  people?: string;

  @Optional()
  @IsDateString()
  sharedLinks?: string;

  @Optional()
  @IsDateString()
  stacks?: string;

  @Optional()
  @IsDateString()
  users?: string;
}

export class SyncStreamResponseDto {
  @ApiProperty({ enum: SyncType, enumName: 'SyncType' })
  type!: SyncType;

  @ApiProperty({
    anyOf: [
      { $ref: getSchemaPath(AssetResponseDto) },
      { $ref: getSchemaPath(AlbumResponseDto) },
      { $ref: getSchemaPath(AlbumAssetResponseDto) },
      { $ref: getSchemaPath(ActivityResponseDto) },
      { $ref: getSchemaPath(MemoryResponseDto) },
      { $ref: getSchemaPath(PartnerResponseDto) },
      { $ref: getSchemaPath(PersonResponseDto) },
      { $ref: getSchemaPath(SharedLinkResponseDto) },
      { $ref: getSchemaPath(StackResponseDto) },
      { $ref: getSchemaPath(UserResponseDto) },
    ],
  })
  data!:
    | ActivityResponseDto
    | AssetResponseDto
    | AlbumResponseDto
    | AlbumAssetResponseDto
    | MemoryResponseDto
    | PartnerResponseDto
    | PersonResponseDto
    | SharedLinkResponseDto
    | StackResponseDto
    | UserResponseDto;
}

export class SyncStreamDto {
  @IsEnum(SyncType, { each: true })
  @ApiProperty({ enum: SyncType, isArray: true })
  @ArrayNotEmpty()
  types!: SyncType[];
}

export class AssetFullSyncDto {
  @ValidateUUID({ optional: true })
  lastId?: string;

  @ValidateDate()
  updatedUntil!: Date;

  @IsInt()
  @IsPositive()
  @ApiProperty({ type: 'integer' })
  limit!: number;

  @ValidateUUID({ optional: true })
  userId?: string;
}

export class AssetDeltaSyncDto {
  @ValidateDate()
  updatedAfter!: Date;

  @ValidateUUID({ each: true })
  userIds!: string[];
}

export class AssetDeltaSyncResponseDto {
  needsFullSync!: boolean;
  upserted!: AssetResponseDto[];
  deleted!: string[];
}
