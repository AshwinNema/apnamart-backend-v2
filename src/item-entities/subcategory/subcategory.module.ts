import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { SubCatFltrService } from './filter/filter.service';
import { SubCatFltrOptService } from './filter-option/filter-option.service';
import { SubCatFltrController } from './filter/filter.controller';
import { SubCatFltrOptionController } from './filter-option/filter-option.controller';
import { UploaderModule } from 'src/uploader/uploader.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [UploaderModule, NestjsFormDataModule],
  providers: [
    SubcategoryService,
    SubCatFltrService,
    SubCatFltrOptService,
  ],
  controllers: [
    SubcategoryController,
    SubCatFltrController,
    SubCatFltrOptionController,
  ],
})
export class SubcategoryModule {}
