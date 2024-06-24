import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { getTokenExpiration } from 'src/utils';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  async saveToken(
    token: string,
    userId: number,
    expires: Date,
    type: TokenType,
    blackListed: boolean = false,
  ) {
    const savedToken = await this.prismaService.token.create({
      data: {
        token,
        userId,
        expires,
        type,
        blackListed,
      },
    });

    return savedToken;
  }

  generateToken(
    userId: number,
    exp: number,
    type: string,
    secret: string,
  ): string {
    const payload = {
      sub: userId,
      exp,
      type,
    };

    return jwt.sign(payload, secret);
  }

  generateAuthTokens(userId: number) {
    const jwt = this.configService.get('jwt');
    const currentTime = Math.floor(Date.now() / 1000);
    const {
      access_secret,
      refresh_secret,
      accessTokenExpiration,
      refreshTokenExpiration,
    } = jwt;

    const accessToken = this.generateToken(
      userId,
      currentTime + accessTokenExpiration,
      TokenType.access,
      access_secret,
    );
    const refreshToken = this.generateToken(
      userId,
      currentTime + refreshTokenExpiration,
      TokenType.refresh,
      refresh_secret,
    );
    const accessExpDate = getTokenExpiration(accessTokenExpiration);
    const refreshExpDate = getTokenExpiration(refreshTokenExpiration);
    this.saveToken(accessToken, userId, accessExpDate, TokenType.access);
    this.saveToken(refreshToken, userId, refreshExpDate, TokenType.refresh);

    return {
      access: {
        token: accessToken,
        expires: new Date(accessExpDate).toISOString(),
      },
      refresh: {
        token: refreshToken,
        expires: new Date(refreshExpDate).toISOString(),
      },
    };
  }
}
