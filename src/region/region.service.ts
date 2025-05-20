import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

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
