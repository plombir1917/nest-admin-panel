import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
}
