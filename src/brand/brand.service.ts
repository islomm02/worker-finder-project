import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create(createBrandDto: CreateBrandDto) {
    try {
      let brand = await this.prisma.brand.findFirst({
        where: { name_uz: createBrandDto.name_uz },
      });
      if (brand) {
        throw new BadRequestException('Brand already exists');
      }
      brand = await this.prisma.brand.create({ data: createBrandDto });
      return brand;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  
  async findAll() {
    try {
      let brands = await this.prisma.brand.findMany();
      return brands;
    } catch (error) {
      console.log(error);
      return error.message
    }
  }

  async findOne(id: string) {
    let one = await this.prisma.brand.findFirst({ where: { id } })
    if (!one) {
      throw new NotFoundException("Brand Not found")
    }
    return one
  }

  async update(id: string, data: UpdateBrandDto) {
    try {
      let one = await this.prisma.brand.findFirst({ where: { id } })
      if (!one) {
        throw new NotFoundException("Brand not found")
      }
      let updated = await this.prisma.brand.update({ where: { id }, data })
      return updated
    } catch (error) {
      console.log(error);
      return error.message
    }
  }

  async remove(id: string) {
    try {
      let one = await this.prisma.brand.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('Brand not found');
      }
      let deleted = await this.prisma.brand.delete({ where: { id } });
      return deleted;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
