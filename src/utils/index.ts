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
