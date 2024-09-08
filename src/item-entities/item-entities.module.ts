import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CategoryController } from 'src/item-entities/category/category.controller';
import { UploaderModule } from 'src/uploader/uploader.module';
import { CategoryService } from './category/category.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { SubcategoryService } from './subcategory/subcategory.service';
import { CommonService } from 'src/common/common.service';
import { SubcategoryController } from './subcategory/subcategory.controller';
import { ItemModule } from './item/item.module';
import { RouterModule } from '@nestjs/core';
import { Subcategory2Controller } from './subcategory/subcategory2.controller';

@Module({
  imports: [
    NestjsFormDataModule,
    UploaderModule,
    ItemModule,
    RouterModule.register([
      {
        path: 'item',
        module: ItemModule,
      },
    ]),
  ],
  providers: [
    CategoryService,
    ProductService,
    SubcategoryService,
    CommonService,
  ],
  controllers: [
    CategoryController,
    ProductController,
    SubcategoryController,
    Subcategory2Controller,
  ],
})
export class ItemEntitiesModule {}
