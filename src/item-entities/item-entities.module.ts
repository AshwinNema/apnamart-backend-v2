import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CategoryController } from 'src/item-entities/category/category.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploaderModule } from 'src/uploader/uploader.module';
import { CategoryService } from './category/category.service';

@Module({
  imports: [NestjsFormDataModule, UploaderModule],
  providers: [PrismaService, CategoryService],
  controllers: [CategoryController],
})
export class ItemEntitiesModule {}
