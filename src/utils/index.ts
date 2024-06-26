import { User } from '@prisma/client';
export const getTokenExpiration = (expirationSec: number): Date => {
  const eexpirationDate = new Date();
  eexpirationDate.setSeconds(eexpirationDate.getSeconds() + expirationSec);
  return eexpirationDate;
};

export const excludeUserFields = (data: User[] | User | undefined | null) => {
  if (!data) {
    return;
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
