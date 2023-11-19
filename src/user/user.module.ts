import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { AccountModule } from 'src/account/account.module';
import { BlockListModule } from 'src/block-list/block-list.module';

@Module({
  imports: [DatabaseModule, AccountModule, BlockListModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
