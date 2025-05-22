import { Module } from '@nestjs/common';
import { MulterController } from './multer.controller';

@Module({
  providers: [],
  controllers: [MulterController]
})
export class MulterModule {}
