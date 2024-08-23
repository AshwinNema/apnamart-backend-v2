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
import { UserService } from 'src/user-entites/user/user.service';
import { TokenService2 } from '../token/token2.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  TokenTypes.access,
) {
  constructor(
    private userService: UserService,
    private tokenService2: TokenService2,
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey:
          envConfig?.JWT_ACCESS_SECRET || process.env.JWT_ACCESS_SECRET,
        passReqToCallback: true,
      },
      async (request, jwt_payload, done) => {
        if (jwt_payload.type !== TokenTypes.access) {
          done(new UnauthorizedException('Invalid token type'), false);
          return;
        }
        try {
          const userId = parseInt(jwt_payload.sub);
          const user = await this.userService.findUnique({ id: userId });
          if (!user) {
            done(null, false, 'User not found');
            return;
          }
          const tokenStr = request.headers.authorization
            .split('Bearer')[1]
            .trim();
          const token = await this.tokenService2.findUnique({
            token: tokenStr,
            blackListed: false,
            type: TokenTypes.access,
            userId,
          });

          if (!token) {
            done(new UnauthorizedException('Token not found'), false);
            return;
          }

          done(null, user);
        } catch (err) {
          done(err, false);
        }
      },
    );
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
