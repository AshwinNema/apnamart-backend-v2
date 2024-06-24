import { UserRole } from '@prisma/client';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class loginValidation {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  role: UserRole;
}

export class registerUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  name: string;

  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8}$/, {
    message:
      'password should contain 1 capital letter, 1 number and should have a length of atleast 8 characters',
  })
  @IsNotEmpty()
  password: string;
}
