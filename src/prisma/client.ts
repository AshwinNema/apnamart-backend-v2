import { PrismaClient } from '@prisma/client';
import { getPrismaOptions } from './utils';
import { prismaExtension } from './extension';
import * as fs from 'fs';

const prisma = new PrismaClient({
  log: [
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
  ],
});

const logFile = fs.createWriteStream('prisma-query.log', { flags: 'a' });

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  logFile.write(`Query: ${e.query}\n`);
});

const extendedClient = prisma.$extends(prismaExtension);

export default extendedClient;
