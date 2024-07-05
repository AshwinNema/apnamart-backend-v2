import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SubCatFltrOptionValidation {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class FilterOptionCreateValidation {
  @IsInt()
  featureId: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class SubCatFltrBodyValidation {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  subCategoryId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  @ArrayUnique((o) => o.name)
  options: SubCatFltrOptionValidation[];
}

export class SubcatFltrValidation {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  options: SubCatFltrOptionValidation[];
}

export class FeatureUpdateValidation {
  @IsNotEmpty()
  @IsString()
  name: string;
}
