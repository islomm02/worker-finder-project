import { Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BasketService {

  constructor(private prisma: PrismaService) {}

  async create(createBasketDto: CreateBasketDto) {
    try {
      let one = await this.prisma.basketItem
    } catch (error) {
      
    }  
    return 'This action adds a new basket';
  }

  findAll() {
    return `This action returns all basket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
