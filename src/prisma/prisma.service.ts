import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { prismaExtension } from './prisma.extensions';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  prisma: any;
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.prisma = new PrismaClient().$extends(prismaExtension);
  }
}
