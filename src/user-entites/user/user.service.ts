import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/interfaces';
import prisma from 'src/prisma/client';

@Injectable()
export class UserService {
  constructor() {}

  async createUser(data): Promise<UserInterface | UserInterface[]> {
    const newUser = await prisma.user.create({
      data,
    });

    return newUser;
  }

  async findUnique(filter, options = {}): Promise<UserInterface> {
    const user = await prisma.user.findUnique({
      where: filter,
      ...options,
    });

    return user;
  }

  async updateUser(where, data) {
    const updatedUser = await prisma.user.update({
      where,
      data,
    });
    return updatedUser;
  }
}
