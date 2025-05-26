// bot.module.ts
import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot.update';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '8089736496:AAHEVW3DUuVP2teKnpMc5sbJhQrX0MHlMcY',
    }),
  ],
  providers: [BotService, BotUpdate],
  exports: [BotUpdate, BotService],})
export class BotModule {}
