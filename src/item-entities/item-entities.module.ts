import { Module } from '@nestjs/common';
import { CategoryController } from 'src/item-entities/category/category.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  controllers: [CategoryController],
})
export class ItemEntitiesModule {}
