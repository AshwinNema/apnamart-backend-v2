import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

import * as TwitterTokenStrategy from 'passport-twitter-token';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { OtherTokenTypes } from 'src/utils';
import { UserService } from 'src/user-entites/user/user.service';
import { UserRole } from '@prisma/client';
import { UserInterface } from 'src/interfaces';

@Injectable()
export class TwitterAcessStrategy extends PassportStrategy(
  TwitterTokenStrategy,
  OtherTokenTypes.twitter,
) {
  constructor(private userService: UserService) {
    super({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      includeEmail: true,
    });
  }

  async validate(token, tokenSecret, profile, done) {
    const email = profile?.emails?.[0]?.value || '';
    if (!email) {
      return done(
        new BadRequestException('Email of the user not found in profile'),
        profile,
      );
    }
    const user = await this.userService.findUnique({ email });
    const profileDetails = {
      email,
      name: profile.displayName,
      userDetails: user,
    };
    return done(null, profileDetails);
  }
}

// User checks
// 1. Admin role cannot be assigned to an existing user
// 2. New user cannot be made an admin
@Injectable()
export class TwitterAccessAuthGuard extends AuthGuard(OtherTokenTypes.twitter) {
  constructor() {
    super({});
  }

  handleRequest<TUser = any>(
    err: any,
    profile: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !profile) {
      throw err || new UnauthorizedException();
    }

    const req: Request = context.getArgByIndex(0);
    const role = req.query.role as UserRole;
    const userDetails: UserInterface = profile.userDetails;
    if (role === UserRole.admin) {
      if (!userDetails) {
        throw new BadRequestException('Admin user creation not allowed');
      }

      if (userDetails && !userDetails.userRoles.includes(UserRole.admin)) {
        throw new BadRequestException(
          'Admin role cannot be assigned to existing user',
        );
      }
    }
    return profile;
  }
}
