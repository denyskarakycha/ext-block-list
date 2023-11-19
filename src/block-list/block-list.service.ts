import { Injectable } from '@nestjs/common';
import { BlockItem, BlockList } from '@prisma/client';
import { SessionDto } from 'src/auth/dto/session.dto';
import { DatabaseService } from 'src/database/database.service';
import { BlockListQueryDto } from './dto/block-list-query.dto';
import { AddBlockItemDto } from './dto';

@Injectable()
export class BlockListService {
  constructor(private database: DatabaseService) {}

  async create(userId: number): Promise<BlockList> {
    return await this.database.blockList.create({
      data: { ownerId: userId },
    });
  }

  async getByUserId(
    sessionDto: SessionDto,
    blockListQueryDto: BlockListQueryDto,
  ): Promise<BlockList> {
    const { q } = blockListQueryDto;
    const { userId } = sessionDto;

    return await this.database.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
      include: {
        items: {
          where: {
            data: {
              contains: q,
              mode: 'insensitive',
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async addItem(
    sessionDto: SessionDto,
    addBlockItemDto: AddBlockItemDto,
  ): Promise<BlockItem> {
    const { userId } = sessionDto;

    const blockList = await this.database.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    });

    return this.database.blockItem.create({
      data: { blockListId: blockList.id, ...addBlockItemDto },
    });
  }

  async removeItem(sessionDto: SessionDto, id: number): Promise<BlockItem> {
    const { userId } = sessionDto;
    const blockList = await this.database.blockList.findUniqueOrThrow({
      where: { ownerId: userId },
    });

    return await this.database.blockItem.delete({
      where: {
        blockListId: blockList.id,
        id,
      },
    });
  }
}
