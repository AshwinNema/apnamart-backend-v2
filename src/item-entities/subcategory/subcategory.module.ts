import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { UploaderModule } from 'src/uploader/uploader.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
@Module({
  imports: [UploaderModule, NestjsFormDataModule],
  providers: [SubcategoryService],
  controllers: [
    SubcategoryController,
  ],
})
export class SubcategoryModule {}
