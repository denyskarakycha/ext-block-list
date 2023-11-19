import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BlockListQueryDto {
  @ApiProperty({ nullable: true, required: false })
  @IsOptional()
  q?: string;
}
