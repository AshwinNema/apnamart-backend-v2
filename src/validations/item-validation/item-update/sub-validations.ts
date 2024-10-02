import { Transform, Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  FilterOptionValidation,
  validateDeleteIds,
  validateDuplicatesNames,
} from '../sub-validations';

class UpdateFilterOption extends FilterOptionValidation {
  @Min(1)
  @IsInt()
  id: number;
}

export class updateFilter {
  @Min(1)
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsOptional()
  @ArrayUnique((option) => option.name, {
    message: 'All the option names for the filter must be unique',
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => FilterOptionValidation)
  createOptions: FilterOptionValidation[];

  @Transform(validateDeleteIds('updateOptions', 'Filter options'))
  @IsInt({ each: true })
  @IsArray()
  @ArrayUnique((id) => id)
  @IsOptional()
  deleteOptions: number[];

  @Transform(
    validateDuplicatesNames(
      'createOptions',
      'name',
      'Same name present while creating and updating options',
    ),
  )
  @ArrayUnique((option) => option.name, {
    message: 'All the option names for the filter must be unique',
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => UpdateFilterOption)
  @IsOptional()
  updateOptions: UpdateFilterOption[];
}