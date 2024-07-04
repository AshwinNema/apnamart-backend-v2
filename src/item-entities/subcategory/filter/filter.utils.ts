import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { create } from 'domain';
import {
  SubCatFltrOptionValidation,
  SubCatFltrBodyValidation,
} from 'src/validations';

export const createFilterTransformer = (
  filterData: SubCatFltrBodyValidation,
) => {
  if (!filterData?.options?.length) {
    return filterData;
  }

  filterData.options = filterData.options.map(
    (option: SubCatFltrOptionValidation) => {
      return plainToClass(SubCatFltrOptionValidation, option);
    },
  );

  return filterData;
};

@Injectable()
export class FilterBodyTransformer implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'custom') {
      return value;
    }
    const { user, body } = value;
    body.createdBy = user.id;
    if (body?.options?.length) {
      body.options = {
        create: body.options.map((option) => {
          option.createdBy = user.id;
          return option;
        }),
      };
    }
    return value;
  }
}
