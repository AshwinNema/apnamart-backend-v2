import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token/token.service';
import { TokenService2 } from './token/token2.service';
import { ConfigService } from '@nestjs/config';
import { LogoutValidator, RefreshTokenValidator } from 'src/validations';
import { TokenTypes } from '@prisma/client';
import prisma from 'src/prisma/client';

@Injectable()
export class Auth2Service {
  private readonly logger = new Logger(Auth2Service.name);
  constructor(
    private tokenService: TokenService,
    private tokenService2: TokenService2,
    private configService: ConfigService,
  ) {}

  async refreshToken(tokenDetails: RefreshTokenValidator) {
    const token = await this.tokenService.verifyToken(
      tokenDetails.token,
      TokenTypes.refresh,
      this.configService.get('jwt').refresh_secret,
      new UnauthorizedException('Forbidden'),
    );
    this.tokenService2.deleteOneToken({ id: token.id });
    return this.tokenService.generateAuthTokens(token.userId);
  }

  async logout(tokens: LogoutValidator) {
    try {
      const promises = [
        prisma.token.delete({
          where: { token: tokens.access, type: TokenTypes.access },
        }),
        prisma.token.delete({
          where: { token: tokens.refresh, type: TokenTypes.refresh },
        }),
      ];
      await Promise.allSettled(promises);
    } catch (err) {
      this.logger.error(err.message);
    }

    return { success: true };
  }
}
