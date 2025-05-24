import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { TelegrambotService } from 'src/telegrambot/telegrambot.service';
import { TelegrambotModule } from 'src/telegrambot/telegrambot.module';

@Module({
  imports: [
    CacheModule.register({ ttl: 5000 }),
    TelegrambotModule
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
