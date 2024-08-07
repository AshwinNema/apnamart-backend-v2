import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CategoryController } from 'src/item-entities/category/category.controller';
import { UploaderModule } from 'src/uploader/uploader.module';
import { CategoryService } from './category/category.service';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { RouterModule } from '@nestjs/core';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

@Module({
  imports: [
    NestjsFormDataModule,
    UploaderModule,
    SubcategoryModule,
    RouterModule.register([
      {
        path: 'subcategory',
        module: SubcategoryModule,
      },
    ]),
  ],
  providers: [CategoryService, ProductService],
  controllers: [CategoryController, ProductController],
})
export class ItemEntitiesModule {}
