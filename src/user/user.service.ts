import { Injectable } from '@nestjs/common';
import { ExtendedClient, PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { excludeUserFields } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    const newUser = await this.prismaService.prisma.user.create({
      data,
    });
    return excludeUserFields(newUser);
  }
}
