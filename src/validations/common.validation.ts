import { plainToClass } from 'class-transformer';
import {
  validate,
  ValidatorOptions,
  ValidationError,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ClassConstructor } from '../utils/types';
import { ValidatedObject } from '../interfaces';

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
      message: errors
        .map((error: ValidationError) => {
          return Object.values(error.constraints).join(', ');
        })
        .join(', '),
    };
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

export class GenericDataValidator<T extends object>
  implements ValidatorConstraintInterface
{
  private errorMsg: string;
  private validatorClass: ClassConstructor<T>;

  constructor(
    validatorClass: ClassConstructor<T>,
    defaultError: string = 'Validation failed',
  ) {
    this.validatorClass = validatorClass;
    this.errorMsg = defaultError;
  }

  // When validate returns true this means that validation is successful otherwise its a failure
  // !error = Error occurred hence validation did not succeed.
  async validate(data: string): Promise<boolean> {
    const { error, message } = await validateObject(
      JSON.parse(data),
      this.validatorClass,
    );
    if (message) {
      this.errorMsg = message;
    }
    return !error;
  }
  defaultMessage(): string {
    return this.errorMsg;
  }
}
