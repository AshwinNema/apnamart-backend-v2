import { Prisma } from '@prisma/client';

export type UserInterface = Omit<Prisma.UserMinAggregateOutputType, 'password'>;

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
