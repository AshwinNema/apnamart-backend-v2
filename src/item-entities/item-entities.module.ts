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
import { ItemService } from './item/item.service';

@Module({
  imports: [NestjsFormDataModule, UploaderModule],
  providers: [
    CategoryService,
    ProductService,
    SubcategoryService,
    ItemService,
    CommonService,
  ],
  controllers: [CategoryController, ProductController, SubcategoryController],
})
export class ItemEntitiesModule {}
