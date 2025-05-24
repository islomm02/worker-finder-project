import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderItemService {

  constructor(private prisma: PrismaService){}

  async create(data: CreateOrderItemDto) {
    try {
      const orderItem = await this.prisma.orderItem.create({ data })
      return orderItem
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findAll() {
    try {
    } catch (error) {
      
    }
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
