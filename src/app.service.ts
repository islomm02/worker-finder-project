import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
    console.log(randomSixDigit);

    return 'Hello World!';
  }
}
