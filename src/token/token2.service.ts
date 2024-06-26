import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService2 {
  constructor(private prismaService: PrismaService) {}

  async deleteOneToken(deleteFilter) {
    return this.prismaService.token.delete({
      where: deleteFilter,
    });
  }

  async deleteMany(deleteFilter) {
    return this.prismaService.token.deleteMany({
      where: deleteFilter,
    });
  }
}
