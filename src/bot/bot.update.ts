// src/bot/bot.update.ts
import { Update, Start, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply('Salom! Xush kelibsiz 🤖');

    const chatId = ctx.message?.chat.id?.toString();
    const telegramUserName = ctx.message?.chat?.id?.toString(); 

    console.log(`Chat ID: ${chatId}`, "username", ctx.from?.username);
    

    if (chatId && telegramUserName) {
      await this.botService.saveUserChatId(telegramUserName, chatId);
    }
  }
}
