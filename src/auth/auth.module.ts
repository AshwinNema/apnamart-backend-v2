import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessStrategy, JwtAccessAuthGuard } from './jwt/access.jwt';
import { TokenService } from 'src/token/token.service';
import { AdminService } from 'src/user-entites/admin/admin.service';
import { envConfig } from 'src/config/config';
import { UserService } from 'src/user/user.service';
import { TokenService2 } from 'src/token/token2.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesGuard } from './role/role.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: envConfig?.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: envConfig?.JWT_ACCESS_EXPIRATION },
    }),
    JwtModule.register({
      secret: envConfig?.JWT_REFRESH_SECRET,
      signOptions: {
        expiresIn: envConfig?.JWT_REFRESH_EXPIRATION,
      },
    }),
  ],
  providers: [
    AuthService,
    AdminService,
    JwtAccessStrategy,
    TokenService2,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAccessAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    TokenService,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
