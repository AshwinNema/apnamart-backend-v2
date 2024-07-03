import { IsNotEmpty, IsString } from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';
import { FeatureValidation } from './feature.validation';

export class CategoryValidator {
  @IsString()
  @IsNotEmpty()
  name: string;
  features: FeatureValidation[];
}

export class CreateCatValidation {
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
