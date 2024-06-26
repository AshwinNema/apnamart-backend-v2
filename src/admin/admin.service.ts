import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { registerAdmin } from 'src/validations';

@Injectable()
export class AdminService {
  constructor(private userService: UserService) {}

  async registerAdmin(adminDetails: registerAdmin) {
    return this.userService.createUser({
      ...adminDetails,
      userRoles: [UserRole.admin],
      cart: {},
      wishList: {},
    });
  }
}
