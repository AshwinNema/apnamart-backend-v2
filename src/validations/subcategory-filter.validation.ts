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
  filterId: number;

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
  @ArrayUnique((option) => option.name)
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

export class FilterUpdateValidation {
  @IsNotEmpty()
  @IsString()
  name: string;
}
