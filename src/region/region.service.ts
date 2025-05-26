import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BotService } from 'src/bot/bot.service';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService,
        private bot: BotService
    
  ) {}

  async create(data: CreateRegionDto) {
    try {
      let region = await this.prisma.region.findFirst({
        where: { name: data.name },
      });
      if (region) {
        throw new Error('Region with this name already exists');
      }
      region = await this.prisma.region.create({
        data,
      });
      return region;
    } catch (error) {
      console.log(error);

      return error.message;
    }
  }

  async findAll() {
    let user = await this.prisma.user.findFirst({
      where: { id: '310c5e10-f087-491f-a72e-8550c602773c' },
    });
    
          await this.prisma.user.update({
            where: { id: '310c5e10-f087-491f-a72e-8550c602773c' },
            data: { telegramUserName: 'toxirovvv_1' },
          });
          if (!user?.telegramChatId) {
            throw new BadRequestException(
              'User does not have a Telegram chat ID. Please send /start to bot @find_worker_bot_bot .',
            );
          }
          if (user?.telegramChatId) {
            await this.bot.sendMessageToUser(
              user.telegramChatId,
              `Buyurtma qabul qilindi! Buyurtma`,
            );
          }
    return await this.prisma.region.findMany();
  }

  async findOne(id: string) {
    try {
      let one = await this.prisma.region.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('Region not found');
      }
      return one;
    } catch (error) {
      console.log(error);

      return error.message;
    }
  }

  async update(id: string, data: UpdateRegionDto) {
    try {
      let region = await this.prisma.region.findFirst({ where: { id } });
      if (!region) {
        throw new NotFoundException('Region not found');
      }
      let updated = await this.prisma.region.update({ where: { id }, data });
      return updated;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async remove(id: string) {
    try {
      let region = await this.prisma.region.findFirst({ where: { id } });
      if (!region) {
        throw new NotFoundException('Region not found');
      }
      let deleted = await this.prisma.region.delete({ where: { id } });
      return deleted
    } catch (error) {
      console.log(error);

      return error.message;
    }
  }
}
