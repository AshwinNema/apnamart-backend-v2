import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import prisma from 'src/prisma/client';

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
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'custom') {
      return value;
    }
    const { user, body } = value;

    if (
      !(await prisma.subCategory.findUnique({
        where: { id: body.subCategoryId },
      }))
    ) {
      throw new NotFoundException('Sub category not found');
    }

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
