import { UserRole } from '@prisma/client';
import { ClassConstructor } from 'src/utils/types';

export interface FormattedUser {
  id: number;
  name: string;
  email: string;
  password: string;
  userRoles: UserRole[];
  address: string;
  phoneNo: string;
  createdAt: Date;
  updatedAt: Date;
  isBlackListed: boolean;
  archive: boolean;
}

export interface ValidatedObject {
  error: boolean;
  message: string;
}

export interface CreateCategoryData {
  name: string;
}

export interface CreateSubCategoryData {
  name: string;
  categoryId: number;
}
