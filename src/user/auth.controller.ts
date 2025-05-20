import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './auth.service';
import {
  CreateUserFiz,
  CreateUserYur,
  LoginUserDto,
} from './dto/create-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register-fiz')
  registerFiz(@Body() createUserDto: CreateUserFiz) {
    return this.userService.registerFiz(createUserDto);
  }

  @Post('register-yur')
  rgisterYur(@Body() createUserDto: CreateUserYur) {
    return this.userService.registerYur(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: LoginUserDto) {
    return this.userService.login(createUserDto);
  }

  @Get('users')
  findAll() {
    return this.userService.findAll();
  }
}
