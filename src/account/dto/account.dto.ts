import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class AccountDto {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: '1' })
  ownerId: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  isBlockingEnable: boolean;
}
