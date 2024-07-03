import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { create } from 'domain';
import { FeatureOptionValidation, FeatureValidation } from 'src/validations';

export const featureCreateTransformer = (featureData: FeatureValidation) => {
  if (!featureData?.options?.length) {
    return featureData;
  }

  featureData.options = featureData.options.map(
    (option: FeatureOptionValidation) => {
      return plainToClass(FeatureOptionValidation, option);
    },
  );

  return featureData;
};

@Injectable()
export class CrtFeatureBodyTransformer implements PipeTransform {
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
