import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'node:console';
import e from 'express';

@Injectable()
export class PartnersService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto) {
    try {
      let one = await this.prisma.partners.findFirst({ where: { name_uz: createPartnerDto.name_uz } });
      if (one) {
        throw new BadRequestException('This Partner already exists');
      }
      const partner = await this.prisma.partners.create({ data: createPartnerDto });
      return partner;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

 async findAll() {
   try {
     let partners = await this.prisma.partners.findMany()
     return partners;
   } catch (error) {
    console.log(error);
    return error.message
   } 
  }

  async findOne(id: string) {
    try {
      let one = await this.prisma.partners.findFirst({ where: { id } })
      if (!one) {
        throw new NotFoundException('Partner not found');
      }
      return one;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async   update(id: string, data: UpdatePartnerDto) {
    try {
      let one = await this.prisma.partners.findFirst({ where: { id } })
      if (!one) {
        throw new NotFoundException('Partner not found');
      }
      let updated = await this.prisma.partners.update({ where: { id }, data })
      return updated;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async remove(id: string) {
    try {
      let one = await this.prisma.partners.findFirst({ where: { id } })
      if (!one) {
        throw new NotFoundException('Partner not found');
      }
      let deleted = await this.prisma.partners.delete({ where: { id } })
      return deleted;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
