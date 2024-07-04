import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  LoginValidator,
  RegisterAdminValidator,
  registerUser,
} from 'src/validations';
import { TokenService } from 'src/token/token.service';
import { AdminService } from 'src/user-entites/admin/admin.service';
import { UserService } from 'src/user-entites/user/user.service';
import { excludeUserFields } from 'src/utils';
import { UserRole } from '@prisma/client';
import prisma from 'src/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private tokenService: TokenService,
    private userService: UserService,
  ) {}

  async registerAdmin(adminDetails: RegisterAdminValidator) {
    const admin = await this.adminService.registerAdmin(adminDetails);
    const adminId = Array.isArray(admin) ? admin[0].id : admin.id;
    const tokens = await this.tokenService.generateAuthTokens(adminId);
    return {
      user: {
        ...admin,
        role: UserRole.admin,
      },
      tokens,
    };
  }

  async login(loginCredentails: LoginValidator) {
    const user = await this.userService.findUnique(
      { email: loginCredentails.email },
      false,
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { id: userId, password } = Array.isArray(user) ? user[0] : user;
    const isPasswordMatch = await prisma.user.isPasswordMatch(
      loginCredentails.password,
      password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    const tokens = await this.tokenService.generateAuthTokens(userId);
    return {
      user: { ...excludeUserFields(user), role: loginCredentails.role },
      tokens,
    };
  }

  async register(userDetails: registerUser) {
    const user = await this.userService.findUnique({
      email: userDetails.email,
    });
    const userData = Array.isArray(user) ? user[0] : user;
    const userRoles = [userDetails.role];
    delete userDetails.role;
    let registeredUser;
    if (userData) {
      if (userData.userRoles.includes(userRoles[0])) {
        throw new BadRequestException('User already has the given role');
      } else {
        registeredUser = await this.userService.updateUser(
          {
            email: userDetails.email,
          },
          {
            ...userDetails,
            userRoles: {
              push: userRoles,
            },
          },
        );
      }
    } else {
      registeredUser = await this.userService.createUser({
        ...userDetails,
        userRoles,
      });
    }
    const registeredUserId: number = registeredUser.id;
    const tokens = await this.tokenService.generateAuthTokens(registeredUserId);

    return {
      user: registeredUser,
      tokens,
    };
  }
}
