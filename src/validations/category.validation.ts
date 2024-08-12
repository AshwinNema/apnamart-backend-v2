import { IsNotEmpty, IsString } from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';
import { mimeTypes } from 'src/utils';

export class CategoryValidator {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateCatValidation {
  @IsString()
  @IsNotEmpty()
  data: string;

  @IsFile()
  @MaxFileSize(4e6, {
    message: 'Maximum size of the file should be 4 mega byte',
  })
  @HasMimeType([mimeTypes.image], {
    message: 'File must be an image',
  })
  file: Express.Multer.File;
}
