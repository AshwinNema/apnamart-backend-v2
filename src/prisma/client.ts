import { PrismaClient } from '@prisma/client';
import { prismaExtension } from './extension';
import { getPrismaOptions } from './utils';

const prisma = new PrismaClient(getPrismaOptions()).$extends(prismaExtension);

export default prisma;
