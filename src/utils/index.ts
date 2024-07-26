import { UserRole } from '@prisma/client';
import { ValidationError } from 'class-validator';

export const getTokenExpiration = (expirationSec: number): Date => {
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + expirationSec);
  return expirationDate;
};

export const passwordValidation = {
  regex: /(?=.*[A-Z])(?=.*\d).{8,}|(?=.*\d)(?=.*[A-Z]).{8,}/,
  message:
    'password should contain 1 capital letter, 1 number and should have a length of atleast 8 characters',
};

export const mimeTypes = {
  image: 'image/*',
  video: 'video/*',
  imageOrVideo: ['image/*', 'video/*'],
};

export type NonAdminRoles = Exclude<UserRole, 'admin'>;

export enum NonAdminRoleEnum {
  merchant = 'merchant',
  customer = 'customer',
}

export enum OtherTokenTypes {
  twitter = 'twitter',
}

export const processNestedValidationError = (errors: ValidationError[]) => {
  return errors
    .map((error: ValidationError) => {
      if (error.constraints) {
        return Object.values(error.constraints).join(', ');
      }
      if (error.children) {
        return processNestedValidationError(error.children);
      }
      return '';
    })
    .join(', ');
};
