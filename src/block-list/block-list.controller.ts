import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlockListService } from './block-list.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AddBlockItemDto, BlockItemDto, BlockListDto } from './dto';
import { BlockListQueryDto } from './dto/block-list-query.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GetSessionInfo } from 'src/auth/decorators/session-info.decorator';
import { SessionDto } from 'src/auth/dto/session.dto';
import { BlockItem, BlockList } from '@prisma/client';

@Controller('block-list')
@UseGuards(AuthGuard)
export class BlockListController {
  constructor(private readonly blockListService: BlockListService) {}

  @Get()
  @ApiOkResponse({
    type: BlockListDto,
  })
  getList(
    @Query() blockListQueryDto: BlockListQueryDto,
    @GetSessionInfo() sessionDto: SessionDto,
  ): Promise<BlockList> {
    return this.blockListService.getByUserId(sessionDto, blockListQueryDto);
  }

  @Post('item')
  @ApiCreatedResponse({
    type: BlockItemDto,
  })
  addBlockItem(
    @Body() addBlockItemDto: AddBlockItemDto,
    @GetSessionInfo() sessionDto: SessionDto,
  ): Promise<BlockItem> {
    return this.blockListService.addItem(sessionDto, addBlockItemDto);
  }

  @Delete('item/:id')
  @ApiOkResponse({
    type: BlockItemDto,
  })
  removeBlockItem(
    @Param('id', ParseIntPipe) id: number,
    @GetSessionInfo() sessionDto: SessionDto,
  ): Promise<BlockItem> {
    return this.blockListService.removeItem(sessionDto, id);
  }
}
