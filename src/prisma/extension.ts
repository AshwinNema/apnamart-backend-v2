import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { passwordModification, archiveHook, omitUserPassword } from './utils';

export const prismaExtension = Prisma.defineExtension({
  model: {
    user: {
      async isPasswordMatch(password: string, expectedPassword: string) {
        return bcrypt.compare(password, expectedPassword);
      },
    },
  },
  query: {
    user: {
      async update(queryParams) {
        return passwordModification(queryParams);
      },
      async create(queryParams) {
        return passwordModification(queryParams);
      },
      findUnique(queryParams) {
        return omitUserPassword(queryParams);
      },
      findFirst(queryParams) {
        return omitUserPassword(queryParams);
      },
      findFirstOrThrow(queryParams) {
        return omitUserPassword(queryParams);
      },
      findMany(queryParams) {
        return omitUserPassword(queryParams);
      },
      findUniqueOrThrow(queryParams) {
        return omitUserPassword(queryParams);
      },
    },
    $allModels: {
      findMany(queryParams) {
        return archiveHook(queryParams);
      },
      findFirst(queryParams) {
        return archiveHook(queryParams);
      },
      findFirstOrThrow(queryParams) {
        return archiveHook(queryParams);
      },
      findUnique(queryParams) {
        return archiveHook(queryParams);
      },
      findUniqueOrThrow(queryParams) {
        return archiveHook(queryParams);
      },
    },
  },
});
