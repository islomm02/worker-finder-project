import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCapacityDto } from './dto/create-capacity.dto';
import { UpdateCapacityDto } from './dto/update-capacity.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CapacityService {

  constructor(private prisma: PrismaService) {}

  async create(createCapacityDto: CreateCapacityDto) {
    try {
      let cp = await this.prisma.capacity.findFirst({ where: { name_uz: createCapacityDto.name_uz } })
      if (cp) {
        throw new BadRequestException('Capacity already exists');
      }
      cp = await this.prisma.capacity.create({ data: createCapacityDto });
      return cp;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findAll() {
    try {
      let cps = await this.prisma.capacity.findMany()
      return cps;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findOne(id: string) {
    try {
      let one = await this.prisma.capacity.findFirst({ where: { id } })
      if (!one) {
        throw new NotFoundException('Capacity Not found')
      }
      return one;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async update(id: string, data: UpdateCapacityDto) {
    try {
      let one = await this.prisma.capacity.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('Capacity Not found');
      }
      let updated = await this.prisma.capacity.update({ where: { id }, data });
      return updated;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async remove(id: string) {
    try {
      let one = await this.prisma.capacity.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('Capacity Not found');
      }
      let deleted = await this.prisma.capacity.delete({ where: { id } });
      return deleted;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
