import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  SubcatFltrValidation,
  SubCatFltrOptionValidation,
} from 'src/validations';
import { SubCategoryValidator } from 'src/validations/subcategory.validation';

export const subCategoryCreateProcessor = (
  subCategoryData: SubCategoryValidator,
) => {
  if (!subCategoryData?.filters) {
    return subCategoryData;
  }
  subCategoryData.filters = subCategoryData.filters.map(
    (filter: SubcatFltrValidation) => {
      filter.options =
        filter?.options?.map?.((featureOption: SubCatFltrOptionValidation) => {
          return plainToClass(SubCatFltrOptionValidation, featureOption);
        }) || [];
      return plainToClass(SubcatFltrValidation, filter);
    },
  );
  return subCategoryData;
};

@Injectable()
export class SubCatCrtDataPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'custom') {
      return value;
    }
    const { user, body } = value;
    body.data = JSON?.parse?.(body.data);
    body.data.createdBy = user.id;
    if (body?.data?.features) {
      body.data.features = {
        create: body.data.features.map((feature) => {
          if (feature?.options?.length) {
            feature.options = {
              create: feature.options.map((option) => {
                option.createdBy = user.id;
                return option;
              }),
            };
          }
          feature.createdBy = user.id;
          return feature;
        }),
      };
    }
    return value;
  }
}
