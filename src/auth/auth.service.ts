import { Injectable } from '@nestjs/common';
import { registerUser } from 'src/validations';
import { TokenService } from 'src/token/token.service';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private tokenService: TokenService,
  ) {}

  async registerAdmin(adminDetails: registerUser) {
    const admin = await this.adminService.registerAdmin(adminDetails);
    const adminId = Array.isArray(admin) ? admin[0].id : admin.id;
    const tokens = await this.tokenService.generateAuthTokens(adminId);

    return {
      user: admin,
      tokens,
    };
  }
}
