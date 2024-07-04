import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma/client';

@Injectable()
export class TokenService2 {
  constructor() {}

  async deleteOneToken(deleteFilter) {
    return prisma.token.delete({
      where: deleteFilter,
    });
  }

  async deleteMany(deleteFilter) {
    return prisma.token.deleteMany({
      where: deleteFilter,
    });
  }
}
