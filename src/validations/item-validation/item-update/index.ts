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
import { updateFilter } from './sub-validations';
import {
  validateDuplicatesNames,
  CreateFilterValidation,
  validateDeleteIds,
} from '../sub-validations';

export class UpdateItem {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  subCategoryId: number;

  @ArrayUnique((option) => option.name, {
    message: 'All filter names should be unique',
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateFilterValidation)
  @IsOptional()
  newFilters: CreateFilterValidation[];

  @Transform(validateDeleteIds('updateFilters', 'Filters'))
  @IsInt({ each: true })
  @IsArray()
  @ArrayUnique((id) => id)
  @IsOptional()
  deleteFilters: number[];

  @Transform(
    validateDuplicatesNames(
      'newFilters',
      'name',
      'Same names present while creating and updating filters',
    ),
  )
  @ArrayUnique((option) => option.id, {
    message: 'All filter ids should be unique',
  })
  @ArrayUnique((option) => option.name, {
    message: 'All filter names should be unique',
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => updateFilter)
  @IsOptional()
  updateFilters: updateFilter[];
}
