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

async function passwordModification({ args, query }) {
  if (args.data.password) {
    args.data.password = await bcrypt.hash(args.data.password, 8);
  }

  return query(args);
}

export class ExtendedClient {
  prisma: any;
  constructor() {
    this.prisma = new PrismaClient().$extends({
      model: {},
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
  }
}
