import { UserRole } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches, IsString } from 'class-validator';
import { NonAdminRoles, passwordValidation } from 'src/utils';

export class LoginValidator {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  role: UserRole;
}

export class RegisterAdminValidator {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Matches(passwordValidation.regex, {
    message: passwordValidation.message,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class registerUser extends RegisterAdminValidator {
  role: NonAdminRoles;
}

export class RefreshTokenValidator {
  @IsNotEmpty()
  @IsString()
  token: string;
}
