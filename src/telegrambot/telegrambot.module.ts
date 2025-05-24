import { Module } from '@nestjs/common';
import { TelegrambotService } from './telegrambot.service';
import { TelegramController } from './telegrambot.controller';

@Module({
  providers: [TelegrambotService],
  exports: [TelegrambotService],
  controllers: [TelegramController],
})
export class TelegrambotModule {}
