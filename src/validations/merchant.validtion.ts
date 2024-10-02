import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { CustomDigitLengthValidator, LatLng } from './common.validation';
import { Transform } from 'class-transformer';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';
import { mimeTypes } from 'src/utils';

export class MerchantDetails extends LatLng {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsString()
  @IsNotEmpty()
  addressLine2: string;

  @Transform(({ value }) => Number(value))
  @Validate(CustomDigitLengthValidator, [6], {
    message: 'Pin code should be exactly six digits',
  })
  pinCode: number;

  @IsString()
  @IsNotEmpty()
  panCard: string;

  @IsString()
  @IsNotEmpty()
  gstIn: string;

  @IsString()
  @IsNotEmpty()
  bankAcNo: string;
}

export class MerchantRegistrationFile {
  @IsFile()
  @MaxFileSize(4e6, {
    message: 'Maximum size of the file should be 4 mega byte',
  })
  @HasMimeType([mimeTypes.image], {
    message: 'File must be an image',
  })
  file: Express.Multer.File;
}

export class CreateMerchantDetails extends MerchantRegistrationFile {
  @IsString()
  @IsNotEmpty()
  data: string;
}
