import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LevelService {
  constructor(private prisma: PrismaService) {}

  async create(createLevelDto: CreateLevelDto) {
    try {
      let level = await this.prisma.level.findFirst({
        where: { name_uz: createLevelDto.name_uz },
      });
      if (level) {
        throw new BadRequestException('Level already exists');
      }
      level = await this.prisma.level.create({ data: createLevelDto });
      return level;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findAll() {
    try {
      let levels = await this.prisma.level.findMany();
      return levels;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findOne(id: string) {
    try {
      let one = await this.prisma.level.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('Level Not found');
      }
      return one;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async update(id: string, data: UpdateLevelDto) {
    try {
      let one = await this.prisma.level.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('Level Not found');
      }
      let updated = await this.prisma.level.update({ where: { id }, data });
      return updated;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async remove(id: string) {
    try {
      let one = await this.prisma.level.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('Level Not found');
      }
      let deleted = await this.prisma.level.delete({ where: { id }});
      return deleted;
    } catch (error) {
      
    }
    return `This action removes a #${id} level`;
  }
}
