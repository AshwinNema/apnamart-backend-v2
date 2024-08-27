import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const getPrismaOptions = () => {
  const options: Prisma.PrismaClientOptions = {};
  const enableLogging = process.env.ENABLE_PRISMA_LOGGING === 'true';

  if (enableLogging) {
    // options.log = [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'];

    options.log = [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ];
  }
  return options;
};

export async function passwordModification({ args, query }) {
  if (args.data.password) {
    args.data.password = await bcrypt.hash(args.data.password, 8);
  }
  args.omit = {
    password: true,
  };
  return query(args);
}

export function commonHook({ args, query }) {
  args.where = { archive: false, ...args.where };
  args.omit = {
    createdAt: true,
    updatedAt: true,
    ...args.omit,
  };
  return query(args);
}

export function omitUserPassword({ query, args }) {
  args.omit = {
    password: true,
    ...args.omit,
  };
  return query(args);
}
