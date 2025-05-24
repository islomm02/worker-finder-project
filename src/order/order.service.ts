import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegrambotService } from 'src/telegrambot/telegrambot.service';
import { Measure } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    let total = 0;
    const {
      measure,
      howMuch,
      location,
      address,
      date,
      paymentType,
      withDelivery,
      commentToDelivery,
    } = createOrderDto;


    for (const item of createOrderDto.OrderItems) {
      let prds = await this.prisma.product.findFirst({
        where: { id: (item as any).productId },
      });

      let tools = await this.prisma.tools.findFirst({
        where: { id: (item as any).toolId },
      });

      if (prds?.count == 0) {
        throw new BadRequestException("Product is ended");
      }

      if (prds?.count == undefined || prds.count < (item as any).prdQuantity) {
        throw new BadRequestException("Product ocunt is not enough");
      }
      
      
      let newCount = prds.count - (item as any).prdQuantity;
      await this.prisma.product.update({
        where: { id: (item as any).productId },
        data: { count: newCount },
      });
      
      if (tools?.quantity == 0) {
        throw new BadRequestException('Tool is ended');
      }

      if (tools?.quantity == undefined || tools.quantity < (item as any).toolQuantity) {
        throw new BadRequestException("Product ocunt is not enough");
      }
      
      
      let newCountTool = tools.quantity - (item as any).toolQuantity;
      await this.prisma.tools.update({
        where: { id: (item as any).toolId },
        data: { quantity: newCountTool },
      });


      await this.prisma.orderItem.create({
        data: {
          orderId: (item as any).orderId,
          productId: (item as any).productId,
          prdQuantity: (item as any).prdQuantity,
          toolId: (item as any).toolId,
          toolQuantity: (item as any).toolQuantity
        },
      });
      total += tools.price
    }
    const order = await this.prisma.order.create({
      data: {
        location,
        address,
        date,
        paymentType,
        withDelivery,
        commentToDelivery,
        total: 12,
        howMuch,
        userId
      },
    });
  }

  findAll() {
    return `This action returns all order`;
  }
  
  
  async findAllMys(id: string) {
    try {
      let mys = await this.prisma.order.findMany({ where: { userId: id } })
      return mys
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async findOne(id: string) {
    try {
      let one = await this.prisma.order.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('Order with this id not found')
      }
      return one
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async update(id: string, data: UpdateOrderDto) {
    try {
      let one = await this.prisma.order.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('Order with this id not found');
      }
      const updateData = { ...data } as any;
      if (updateData.measure && typeof updateData.measure === 'string') {
        updateData.measure = Measure[updateData.measure as keyof typeof Measure];
      }
      let updated = await this.prisma.order.update({ where: { id }, data: updateData });
      return updated;
      } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
