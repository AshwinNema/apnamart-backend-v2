import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

async function passwordModification({ args, query }) {
  if (args.data.password) {
    args.data.password = await bcrypt.hash(args.data.password, 8);
  }

  return query(args);
}

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
    },
  },
});
