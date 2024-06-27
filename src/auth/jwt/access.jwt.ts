import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { envConfig } from 'src/config/config';
import { TokenTypes } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  TokenTypes.access,
) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        envConfig?.JWT_ACCESS_SECRET || process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload?.type !== TokenTypes.access) {
      return null;
    }
    const userId = parseInt(payload.sub);

    return this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }
}

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard(TokenTypes.access) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(skipAuthKey, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    // info: any,
    // context: ExecutionContext,
    // status?: any,
  ): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

const skipAuthKey = 'skipAuthKey';
export const SkipAccessAuth = () => SetMetadata(skipAuthKey, true);
