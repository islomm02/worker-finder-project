import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FaqService {

  constructor(private prisma: PrismaService){}

  async create(data: CreateFaqDto) {
    try {
      let faq = await this.prisma.fAQ.findFirst({ where: { question: data.question } });
      if (faq) {
        throw new BadRequestException('FAQ already exists')
      }
      faq = await this.prisma.fAQ.create({ data });
      return faq;
    } catch (error) {
      console.log(error);
      return error.message
    }
  }

  async findAll() {
    try {
      let faqs = await this.prisma.fAQ.findMany();
      return faqs;
    } catch (error) {
      console.log(error);
      return error.message
    }
  }

  async findOne(id: string) {
    try {
      let faq = await this.prisma.fAQ.findFirst({ where: { id } });
      if (!faq) {
        throw new NotFoundException('FAQ not found');
      }
      return faq;
    } catch (error) {
      console.log(error);
      return error.message
    }
  }

  async update(id: string, data: UpdateFaqDto) {
    try {
      let faq = await this.prisma.fAQ.findFirst({ where: { id } });
      if (!faq) {
        throw new NotFoundException('FAQ not found');
      }
      let updated = await this.prisma.fAQ.update({ where: { id }, data })
      return updated;
    } catch (error) {
      console.log(error);
      return error.message
    }
  }

  async remove(id: string) {
    try {
      let faq = await this.prisma.fAQ.findFirst({ where: { id } });
      if (!faq) {
        throw new NotFoundException('FAQ not found');
      }
      let deleted = await this.prisma.fAQ.delete({ where: { id } })
      return deleted;
    } catch (error) {
      console.log(error);
      return error.message
    }
  }
}
