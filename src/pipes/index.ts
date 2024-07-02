import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';

import { MultiPartData, ClassConstructor } from '../utils/types';
import { UserInterface } from '../interfaces';
import { validateObject } from 'src/validations';

@Injectable()
export class MultiPartDataPipe<T extends object> implements PipeTransform {
  constructor(
    private validatorClass?: ClassConstructor<T>,
  ) {}
  async transform(value: MultiPartData, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }
    const parsedData = JSON.parse(value.data);
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


