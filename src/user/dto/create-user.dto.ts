import { ApiProperty } from "@nestjs/swagger";

export class CreateUserFiz {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  regionId: string;
  @ApiProperty()
  telegramUserName: string;
}

export class CreateUserYur {
  @ApiProperty()
  fullName: string;

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


export class LoginUserDto{
    @ApiProperty()
    phone: string
    @ApiProperty()
    password: string
}