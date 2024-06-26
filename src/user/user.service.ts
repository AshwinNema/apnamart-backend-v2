import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { excludeUserFields } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data) {
    const newUser = await this.prismaService.prisma.user.create({
      data,
    });

    return excludeUserFields(newUser);
  }

  async findUnique(filter: any, omitPassword: boolean = true) {
    const user = await this.prismaService.prisma.user.findUnique({
      where: filter,
    });
    if (!omitPassword) {
      return user;
    }
    return excludeUserFields(user);
  }

  async updateUser(where, data) {
    const updatedUser = await this.prismaService.prisma.user.update({
      where,
      data,
    });
    return excludeUserFields(updatedUser);
  }
}
