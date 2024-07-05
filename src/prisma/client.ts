import { PrismaClient } from '@prisma/client';
import { prismaExtension } from './prisma.extensions';

const prisma = new PrismaClient({}).$extends(prismaExtension);

export default prisma;
