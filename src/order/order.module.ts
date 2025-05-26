import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { BotModule } from 'src/bot/bot.module';

@Module({
  imports: [
    MailerModule,
    BotModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
