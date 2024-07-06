import { PrismaClient } from '@prisma/client';
import { getPrismaOptions } from './utils';
import { prismaExtension } from './extension';

const prisma = new PrismaClient(getPrismaOptions()).$extends(prismaExtension);

export default prisma;
