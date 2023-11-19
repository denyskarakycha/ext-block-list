import { ApiProperty } from '@nestjs/swagger';
import { BlockItemDto } from './block-item.dto';

export class BlockListDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  ownerId: number;

  @ApiProperty({ type: [BlockItemDto] })
  items: BlockItemDto[];
}
