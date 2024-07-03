import { Prisma } from '@prisma/client';

export type UserInterface = Omit<Prisma.UserMinAggregateOutputType, 'password'>;

export interface ValidatedObject {
  error: boolean;
  message: string;
}

export interface CreateCategoryData {
  name: string;
}

export interface SubCategoryInterface {
  name: string;
  categoryId: number;
}
