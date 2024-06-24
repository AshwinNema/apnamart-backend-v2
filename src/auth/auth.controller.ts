import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAccessAuth } from './jwt/access.jwt';
import { registerUser, loginValidation } from 'src/validations/auth.validation';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAccessAuth()
  @Post('register-admin')
  async registerAdmin(@Body() userDetails: registerUser) {
    return this.authService.registerAdmin(userDetails);
  }

  @SkipAccessAuth()
  @Post('login')
  async login(@Body() loginCredentails: loginValidation) {}
}
