import { User, UserRole } from '@prisma/client';
import { UserInterface } from '../interfaces';
import { ValidationError } from 'class-validator';

export const getTokenExpiration = (expirationSec: number): Date => {
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + expirationSec);
  return expirationDate;
};

export const passwordValidation = {
  regex: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8}$/,
  message:
    'password should contain 1 capital letter, 1 number and should have a length of atleast 8 characters',
};

export const mimeTypes = {
  image: 'image/*',
  video: 'video/*',
  imageOrVideo: ['image/*', 'video/*'],
};

export type NonAdminRoles = Exclude<UserRole, 'admin'>;

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
