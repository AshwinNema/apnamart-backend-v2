import { BadRequestException } from '@nestjs/common';
import { TransformFnParams, Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class FilterOptionValidation {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateFilterValidation {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ArrayMinSize(1)
  @ArrayUnique((option) => option.name, {
    message: 'All the option names for the filter must be unique',
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => FilterOptionValidation)
  options: FilterOptionValidation[];
}

export const validateDuplicatesNames =
  (key: string, fieldKey: string, errMsg: string) =>
  ({ value, obj }: TransformFnParams): PropertyDecorator => {
    const compareObj = obj?.[key];
    if (compareObj) {
      const createNames =
        compareObj?.reduce((obj, item) => {
          obj[item?.[fieldKey]] = true;
          return obj;
        }, {}) || {};
      const duplicateNames = value.filter(
        (item) => !!createNames[item?.[fieldKey]],
      );
      if (duplicateNames?.length) {
        throw new BadRequestException(errMsg);
      }
    }
    return value;
  };

export const validateDeleteIds =
  (key: string, errLabel: string, fieldKey: string = 'id') =>
  ({ value, obj }: TransformFnParams): PropertyDecorator => {
    const compareObj = obj?.[key];
    if (compareObj) {
      const idMap = value.reduce((obj, id) => {
        obj[id] = true;
        return obj;
      }, {});

      compareObj?.forEach?.((item) => {
        const value = item?.[fieldKey];
        if (idMap[value]) {
          throw new BadRequestException(
            `${errLabel} cannot be deleted and updated at the same time`,
          );
        }
      });
    }
    return value;
  };
