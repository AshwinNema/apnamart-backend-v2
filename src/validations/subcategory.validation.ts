import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsArray,
  IsOptional,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';
import { FeatureSubCatValidation } from './feature.validation';

export class SubCategoryValidatior {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  categoryId: number;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  features: FeatureSubCatValidation[];
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
