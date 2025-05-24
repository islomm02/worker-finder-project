import { Controller, Post, Body } from '@nestjs/common';

@Controller('telegram')
export class TelegramController {
  @Post('webhook')
  async handleMessage(@Body() body: any) {
    console.log('Webhook keldi:', JSON.stringify(body));
    return 'ok';
  }
}
