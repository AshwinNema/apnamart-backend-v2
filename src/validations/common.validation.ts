import { plainToClass, Type } from 'class-transformer';
import {
  validate,
  ValidatorOptions,
  ValidationError,
  Min,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ClassConstructor } from '../utils/types';
import { ValidatedObject } from '../interfaces';
import { processNestedValidationError } from 'src/utils';

export const validateObject = async <T extends object>(
  object: object,
  validatorClass: ClassConstructor<T>,
  options?: ValidatorOptions,
): Promise<ValidatedObject> => {
  const convertedObj: object = plainToClass(validatorClass, object);

  try {
    const errors: ValidationError[] = await validate(convertedObj, options);

    return {
      error: !!errors.length,
      message: processNestedValidationError(errors),
    };
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

export class paginationOptions {
  @Min(1)
  @IsInt()
  @Type(() => Number)
  page: number;

  @Min(1)
  @IsInt()
  @Type(() => Number)
  limit: number;
}

export class SearchByName {
  @IsNotEmpty()
  @IsString()
  name: string;
}
