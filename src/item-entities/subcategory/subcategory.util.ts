import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  FeatureSubCatValidation,
  FeatureOptionValidation,
} from 'src/validations';
import { SubCategoryValidatior } from 'src/validations/subcategory.validation';

export const subCategoryCreateProcessor = (
  subCategoryData: SubCategoryValidatior,
) => {
  if (!subCategoryData?.features) {
    return subCategoryData;
  }
  subCategoryData.features = subCategoryData.features.map(
    (feature: FeatureSubCatValidation) => {
      feature.options =
        feature?.options?.map?.((featureOption: FeatureOptionValidation) => {
          return plainToClass(FeatureOptionValidation, featureOption);
        }) || [];
      return plainToClass(FeatureSubCatValidation, feature);
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
