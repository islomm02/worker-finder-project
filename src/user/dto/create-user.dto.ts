import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserFiz {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  @IsPhoneNumber('UZ')
  phone: string;
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;
  @ApiProperty()
  @IsString()
  regionId: string;
  @ApiProperty()
  @IsString()
  telegramUserName: string;
  @ApiProperty()
  @IsEmail()
  email: string;
}
export class CreateUserYur {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  regionId: string;
  @ApiProperty()
  telegramUserName: string;
  @ApiProperty()
  inn: string;
  @ApiProperty()
  mfo: string;
  @ApiProperty()
  pc: string;
  @ApiProperty()
  oked: string;
  @ApiProperty()
  bank: string;
  @ApiProperty()
  adress: string;
}

export class LoginUserDto {
  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
}

export class SendOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  otp: string;
  @ApiProperty()
  newpassword: string;
}

export class VerifyUserDto {
  @ApiProperty()
  otp: string;
  @ApiProperty()
  email: string;
}
