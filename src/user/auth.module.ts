import { Module } from '@nestjs/common';
import { UserService } from './auth.service';
import { UserController } from './auth.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
