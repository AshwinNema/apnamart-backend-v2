import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CategoryController } from 'src/item-entities/category/category.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploaderModule } from 'src/uploader/uploader.module';
import { CategoryService } from './category/category.service';
import { SubcategoryService } from './subcategory/subcategory.service';
import { SubcategoryController } from './subcategory/subcategory.controller';
import { FeatureController } from './feature/feature.controller';
import { FeatureService } from './feature/feature.service';
import { FeatureOptionService } from './feature-option/feature-option.service';
import { FeatureOptionController } from './feature-option/feature-option.controller';

@Module({
  imports: [NestjsFormDataModule, UploaderModule],
  providers: [
    PrismaService,
    CategoryService,
    SubcategoryService,
    FeatureService,
    FeatureOptionService,
  ],
  controllers: [
    CategoryController,
    SubcategoryController,
    FeatureController,
    FeatureOptionController,
  ],
})
export class ItemEntitiesModule {}
