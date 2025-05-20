import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) {}

  async create(createSizeDto: CreateSizeDto) {
    try {
      let size = await this.prisma.size.findFirst({
        where: { name_uz: createSizeDto.name_uz },
      });
      if (size) {
        throw new BadRequestException('Size already exists');
      }
      size = await this.prisma.size.create({ data: createSizeDto });
      return size;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findAll() {
    try {
      let sizes = await this.prisma.size.findMany();
      return sizes;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findOne(id: string) {
    try {
      let one = await this.prisma.size.findFirst({ where: { id } });
      if (!one) {
        throw new BadRequestException('Size Not found');
      }
      return one;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async update(id: string, data: UpdateSizeDto) {
    try {
      let one = await this.prisma.size.findFirst({ where: { id } });
      if (!one) {
        throw new BadRequestException('Size not found');
      }
      let updated = await this.prisma.size.update({ where: { id }, data });
      return updated;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async remove(id: string) {
    try {
      let one = await this.prisma.size.findFirst({ where: { id } });
      if (!one) {
        throw new BadRequestException('Size not found');
      }
      let deleted = await this.prisma.size.delete({ where: { id } });
      return deleted;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
