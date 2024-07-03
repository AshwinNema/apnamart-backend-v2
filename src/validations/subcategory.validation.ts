import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';
import { SubcatFltrValidation } from './subcategory-filter.validation';

export class SubCategoryValidator {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  categoryId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  filters: SubcatFltrValidation[];
}

export class CreateSubCatValidation {
  @IsString()
  @IsNotEmpty()
  data: string;

  @IsFile()
  @MaxFileSize(4e6, {
    message: 'Maximum size of the file should be 4 mega byte',
  })
  @HasMimeType(['image/*'], {
    message: 'File must be an image',
  })
  file: Express.Multer.File;
}
