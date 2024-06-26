import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAccessAuth } from './jwt/access.jwt';
import {
  RegisterAdminValidator,
  LoginValidator,
  registerUser,
  RefreshTokenValidator,
} from 'src/validations/auth.validation';
import { TokenService } from 'src/token/token.service';

import { ConfigService } from '@nestjs/config';
import { TokenTypes } from '@prisma/client';
import { TokenService2 } from 'src/token/token2.service';

@SkipAccessAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private configService: ConfigService,
    private tokenService2: TokenService2,
  ) {}

  @Post('register-admin')
  async registerAdmin(@Body() userDetails: RegisterAdminValidator) {
    return this.authService.registerAdmin(userDetails);
  }

  @Post('login')
  async login(@Body() loginCredentails: LoginValidator) {
    return this.authService.login(loginCredentails);
  }

  @Post('register')
  async register(@Body() userDetails: registerUser) {
    return this.authService.register(userDetails);
  }

  @Post('refresh-token')
  async refreshToken(@Body() tokenDetails: RefreshTokenValidator) {
    const token = await this.tokenService.verifyToken(
      tokenDetails.token,
      TokenTypes.refresh,
      this.configService.get('jwt').refresh_secret,
    );
    this.tokenService2.deleteOneToken({ id: token.id });
    return this.tokenService.generateAuthTokens(token.userId);
  }
}
