import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class BlockItemDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  blockListId: number;

  @ApiProperty({
    enum: [$Enums.BlockItemType.Website, $Enums.BlockItemType.KeyWord],
  })
  type: $Enums.BlockItemType;

  @ApiProperty({ example: 'test' })
  data: string;

  @ApiProperty({ example: 1 })
  createdAt: Date;
}
