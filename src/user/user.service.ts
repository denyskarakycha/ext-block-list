import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AccountService } from 'src/account/account.service';
import { DatabaseService } from '../database/database.service';
import { BlockListService } from 'src/block-list/block-list.service';

@Injectable()
export class UserService {
  constructor(
    private database: DatabaseService,
    private accoundService: AccountService,
    private blockListService: BlockListService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.database.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async create(email: string, hash: string, salt: string): Promise<User> {
    const user = await this.database.user.create({
      data: { email, hash, salt },
    });

    await this.accoundService.createAccount(user.id);
    await this.blockListService.create(user.id);

    return user;
  }
}
