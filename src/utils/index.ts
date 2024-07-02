import { User } from '@prisma/client';
import { UserInterface } from '../interfaces';

export const getTokenExpiration = (expirationSec: number): Date => {
  const expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + expirationSec);
  return expirationDate;
};

export const excludeUserFields = (
  data: User[] | User | undefined | null,
): UserInterface | UserInterface[] => {
  if (!data) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map((user: User) => {
      delete user.password;
      return user;
    });
  }
  delete data.password;
  return data;
};

export const passwordValidation = {
  regex: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8}$/,
  message:
    'password should contain 1 capital letter, 1 number and should have a length of atleast 8 characters',
};

export enum NonAdminRoles {
  merchant,
  customer,
}
