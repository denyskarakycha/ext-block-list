import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AccountDto, PatchAccountDto } from './dto';
import { AccountService } from './account.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetSessionInfo } from '../auth/decorators/session-info.decorator';
import { SessionDto } from '../auth/dto/session.dto';

@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  @ApiOkResponse({ type: AccountDto })
  async getAccount(
    @GetSessionInfo() sessionDto: SessionDto,
  ): Promise<AccountDto> {
    return this.accountService.getAccount(sessionDto.userId);
  }

  @Patch()
  @ApiOkResponse({ type: AccountDto })
  async patchAccount(
    @Body() patchAccountDto: PatchAccountDto,
    @GetSessionInfo() sessionDto: SessionDto,
  ) {
    return this.accountService.patchAccount(sessionDto.userId, patchAccountDto);
  }
}
