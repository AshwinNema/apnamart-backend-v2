import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/interfaces';
import prisma from 'src/prisma/client';
import { excludeUserFields } from 'src/utils';

@Injectable()
export class UserService {
  constructor() {}

  async createUser(data): Promise<UserInterface | UserInterface[]> {
    const newUser = await prisma.user.create({
      data,
    });

    return excludeUserFields(newUser);
  }

  async findUnique(
    filter,
    omitPassword: boolean = true,
  ): Promise<UserInterface | UserInterface[]> {
    const user = await prisma.user.findUnique({
      where: filter,
    });
    if (!omitPassword) {
      return user;
    }
    return excludeUserFields(user);
  }

  async updateUser(where, data) {
    const updatedUser = await prisma.user.update({
      where,
      data,
    });
    return excludeUserFields(updatedUser);
  }
}
