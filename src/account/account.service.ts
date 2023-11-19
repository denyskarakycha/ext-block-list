import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountDto, PatchAccountDto } from './dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AccountService {
  constructor(private database: DatabaseService) {}

  async createAccount(userId: number): Promise<AccountDto> {
    return await this.database.account.create({
      data: {
        ownerId: userId,
        isBlockingEnable: false,
      },
    });
  }
  async getAccount(userId: number): Promise<AccountDto> {
    console.log(userId);
    const account = await this.database.account.findUniqueOrThrow({
      where: {
        ownerId: userId,
      },
    });

    if (!account) {
      throw new UnauthorizedException();
    }

    return account;
  }
  async patchAccount(
    userId: number,
    patchAccountDto: PatchAccountDto,
  ): Promise<AccountDto> {
    return await this.database.account.update({
      where: {
        ownerId: userId,
      },
      data: { ...patchAccountDto },
    });
  }
}
