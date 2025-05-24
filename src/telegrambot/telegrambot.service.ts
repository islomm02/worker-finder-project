import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegrambotService {
  private readonly botToken = '8089736496:AAHEVW3DUuVP2teKnpMc5sbJhQrX0MHlMcY';

  async sendMessage(
    chatId: string,
    count: number,
    product: string,
    time: string,
    user: string,
  ) {
    try {
      const send = async (chatId: string) => {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        await axios.post(url, {
          chat_id: chatId,
          text: `Sizning buyurtmangiz qabul qilindi!\n\nProduct: ${product}\nCount: ${count}\nTime: ${time}\nUser: ${user}`, 
          parse_mode: 'HTML',
        });
      };
      send(chatId);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
