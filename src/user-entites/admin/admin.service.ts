import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { UserService } from 'src/user-entites/user/user.service';
import { RegisterAdminValidator } from 'src/validations';

@Injectable()
export class AdminService {
  constructor(private userService: UserService) {}

  async registerAdmin(adminDetails: RegisterAdminValidator) {
    return this.userService.createUser({
      ...adminDetails,
      userRoles: [UserRole.admin],
      cart: {},
      wishList: {},
    });
  }
}
