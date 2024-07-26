import { Injectable } from '@nestjs/common';
import prisma from 'src/prisma/client';
import { UserService } from 'src/user-entites/user/user.service';
import { TokenService } from './token.service';
import { UserInterface } from 'src/interfaces';
import { UserRole } from '@prisma/client';

@Injectable()
export class TokenService2 {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

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

  async generateDifferentLoginToken(
    user: UserInterface | null,
    { role, name, email }: { role: UserRole; name: string; email: string },
  ) {
    let isNewUser = false;
    if (!user) {
      isNewUser = true;
      user = (await this.userService.createUser({
        name,
        email,
        userRoles: [role],
      })) as UserInterface;
    }

    if (!user.userRoles.includes(role)) {
      this.userService.updateUser(
        { id: user.id },
        {
          userRoles: {
            push: role,
          },
        },
      );
    }

    const tokens = await this.tokenService.generateAuthTokens(user.id);

    return {
      user: { ...user, role },
      tokens,
      isNewUser,
    };
  }
}
