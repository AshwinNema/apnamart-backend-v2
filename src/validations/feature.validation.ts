import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FeatureOptionValidation {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class FeatureOptionCrtValidation {
  @IsInt()
  featureId: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class FeatureValidation {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  subCategoryId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @ArrayUnique((o) => o.name)
  options: FeatureOptionValidation[];
}

export class FeatureSubCatValidation {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  options: FeatureOptionValidation[];
}

export class FeatureUpdateValidation {
  @IsNotEmpty()
  @IsString()
  name: string;
}
