import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class NodemailerService {
  async send(to, otp, text, subject) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bozorboyevazizjon56@gmail.com',
        pass: 'rgqh wpaa xgwg kwna',
      },
    });
    if (!otp) {
      await transporter.sendMail({
        from: 'bozorboyevazizjon56@gmail.com',
        to,
        subject,
        text,
      });
    }
    await transporter.sendMail({
      from: 'bozorboyevazizjon56@gmail.com',
      to,
      subject,
      text: `${text},  ${otp}`,
    });
  }
}
