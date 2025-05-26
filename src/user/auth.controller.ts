import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  UseInterceptors,
  Query,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './auth.service';
import {
  CreateUserFiz,
  ToAdminDto,
  CreateUserYur,
  LoginUserDto,
  ResetPasswordDto,
  SendOtpDto,
  VerifyUserDto,
} from './dto/create-user.dto';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApiQuery } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { TokenGuard } from 'src/guards/token.guard';
import { Verify } from 'node:crypto';
import { RoleGuard } from 'src/guards/role.guard';
import { RoleDecorator } from 'src/decorators/role-decorators';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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

  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'from', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiQuery({ name: 'order', required: false, type: String })
  @ApiQuery({ name: 'fullName', required: false, type: String })
  @ApiQuery({ name: 'phone', required: false, type: String })
  @ApiQuery({ name: 'role', required: false, type: String, enum: UserRole })
  @ApiQuery({ name: 'status', required: false, type: Boolean })
  @ApiQuery({ name: 'regionId', required: false, type: Boolean })
  @ApiQuery({ name: 'telegramUserName', required: false, type: String })
  @ApiQuery({ name: 'telegramChatId', required: false, type: String })
  @UseInterceptors(CacheInterceptor)
  @Get('users')
  findAll(@Query('take') take: string) {
    return this.userService.findAll();
  }

  @UseGuards(TokenGuard)
  @Get('me')
  me(@Req() req) {
    const userId = req.user.id;
    return this.userService.me(userId);
  }

  @UseGuards(TokenGuard)
  @Post('reset-password')
  resetPass(@Req() req, @Body() data: ResetPasswordDto) {
    const userId = req.user.id;
    return this.userService.resetPass(userId, data);
  }

  @Post('verify')
  verify(@Req() req, @Body() data: VerifyUserDto) {
    return this.userService.verify(data);
  }

  @Post('send-otp')
  sendOtp(@Req() req, @Body() data: SendOtpDto) {
    return this.userService.sendOtp(data.email);
  }

  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Post('promote-to-admin')
  toAdmin(@Req() req, @Body() data: ToAdminDto) {
    return this.userService.toAdmin(data.id);
  }

    @RoleDecorator(UserRole.ADMIN)
   @UseGuards(RoleGuard)
   @UseGuards(TokenGuard)
  @Patch()
  updateUser(@Req() req, @Body() data: any) {
    const userId = req.user.id;
    return this.userService.updateUser(userId, data);
  }
}
