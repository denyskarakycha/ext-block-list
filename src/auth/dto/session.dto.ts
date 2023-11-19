import { ApiProperty } from '@nestjs/swagger';

export class SessionDto {
  @ApiProperty({ example: '1' })
  userId: number;
  @ApiProperty({ example: '123456' })
  password: string;
  @ApiProperty({ example: '1700317081' })
  iat: number;
  @ApiProperty({ example: '1700320681' })
  exp: number;
}
