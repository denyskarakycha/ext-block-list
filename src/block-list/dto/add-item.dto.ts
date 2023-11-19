import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsIn } from 'class-validator';

export class AddBlockItemDto {
  @ApiProperty({
    enum: [$Enums.BlockItemType.Website, $Enums.BlockItemType.KeyWord],
  })
  @IsIn([$Enums.BlockItemType.Website, $Enums.BlockItemType.KeyWord])
  type: $Enums.BlockItemType;

  @ApiProperty({ example: 'test' })
  data: string;
}
