import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BotService {
  constructor(
    private prisma: PrismaService,
    @InjectBot() private bot: Telegraf<Context>,
  ) {}

  async saveUserChatId(telegramUserName: string, chatId: string) {
    try {
      await this.prisma.user.update({
        where: { telegramUserName },
        data: { telegramChatId: chatId },
      });
    } catch (error) {
      console.error('Chat ID-ni saqlashda xatolik:', error);
    }
  }

  async sendMessageToUser(chatId: string, message: string) {
    if (!chatId) { 
      return ('Chat ID mavjud emas. Xabar yuborish mumkin emas.');
    } ;
    try {
      await this.bot.telegram.sendMessage(chatId, message);
    } catch (error) {
      console.error('Xabar yuborishda xatolik:', error);
    }
  }
}
