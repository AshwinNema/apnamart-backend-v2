import { UserRole } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { NonAdminRoles, passwordValidation } from 'src/utils';

export class loginValidation {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  role: UserRole;
}

export class registerAdmin {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  name: string;

  @Matches(passwordValidation.regex, {
    message: passwordValidation.message,
  })
  @IsNotEmpty()
  password: string;
}

export class registerUser extends registerAdmin {
  role: NonAdminRoles;
}

export class refreshToken {
  @IsNotEmpty()
  token: string;
}
