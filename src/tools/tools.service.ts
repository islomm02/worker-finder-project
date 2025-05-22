import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class ToolsService {

  constructor(private prisma: PrismaService) {}




  async create(data: CreateToolDto) {
    try {
      let tool = await this.prisma.tools.findFirst({ where: { name_uz: data.name_uz } });
      if (tool) {
        throw new BadRequestException('This tool already exists');
      }
      let code = data.code || Math.floor(100000 + Math.random() * 900000).toString();

      tool = await this.prisma.tools.create({
        data: {...data, code },
      })
      return tool;
    } catch (error) {
      console.log(error);
      return error.meessage;
    }
  }

  async findAll() {
    try {
      let datas = await this.prisma.tools.findMany()
      return datas;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findOne(id: string) {
    try {
      let one = await this.prisma.tools.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('tool Not found');
      }
      return one;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async update(id: string, data: UpdateToolDto) {
    try {
      let one = await this.prisma.tools.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('tool Not found');
      }
      let updated = await this.prisma.tools.update({where: {id}, data})
      return updated;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async remove(id: string) {
    try {
      let one = await this.prisma.tools.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('tool Not found');
      }
      let deleted = await this.prisma.tools.delete({ where: { id } });
      return deleted;
    } catch (error) {
      console.log(error);
      return error.message
    }
  }
}
