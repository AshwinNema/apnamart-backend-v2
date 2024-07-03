import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';

import { MultiPartData, ClassConstructor } from '../utils/types';
import { validateObject } from 'src/validations';

@Injectable()
export class MultiPartDataPipe<T extends object> implements PipeTransform {
  constructor(
    private validatorClass: ClassConstructor<T>,
    private dataProcessor?: (data: object) => object,
  ) {}
  async transform(value: MultiPartData, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }
    let parsedData = JSON.parse(value.data);
    if (this.dataProcessor) {
      parsedData = this.dataProcessor(parsedData);
    }

    const { error, message } = await validateObject(
      parsedData,
      this.validatorClass,
      { whitelist: true, forbidNonWhitelisted: true },
    );

    if (error) {
      throw new UnprocessableEntityException(message);
    }
    value.data = JSON.parse(value.data);
    return value;
  }
}

export class BodyPipe<T extends object> implements PipeTransform {
  constructor(
    private validatorClass: ClassConstructor<T>,
    private dataProcessor?: (data: object) => object,
  ) {}

  async transform(value: object, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }
    let data = { ...value };
    if (this.dataProcessor) {
      data = this.dataProcessor(data);
    }

    const { error, message } = await validateObject(data, this.validatorClass, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (error) {
      throw new UnprocessableEntityException(message);
    }

    return value;
  }
}
