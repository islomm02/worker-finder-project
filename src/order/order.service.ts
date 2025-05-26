import { BadRequestException, Injectable } from '@nestjs/common';
import {  CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { BotUpdate } from 'src/bot/bot.update';
import { BotService } from 'src/bot/bot.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private bot: BotService
  ) {}
  async order(data: CreateOrderDto, req: Request, userId: string ) {
    try {
      let { date, OrderTools, location, OrderProducts, ...rest } = data;

      let TOOL_TotalPrice = 0;

      for (const { toolId, quantity } of OrderTools) {
        const toolExists = await this.prisma.tools.findFirst({
          where: { id: toolId },
        });

        if (!toolExists) {
          throw new BadRequestException(
            `Tool with ID ${toolId} does not exist`,
          );
        }

        if (quantity > toolExists.quantity) {
          throw new BadRequestException(
            `Bu tool dan ${quantity}-ta yoq! Faqat ${toolExists.quantity}-ta qoldi!`,
          );
        }

        await this.prisma.tools.update({
          where: { id: toolExists.id },
          data: { quantity: toolExists.quantity - quantity },
        });

        TOOL_TotalPrice += toolExists.price * quantity;
      }

      const { productId, levelId, quantity } = data.OrderProducts[0];
      const productExists = await this.prisma.product.findFirst({
        where: { id: productId },
      });
      if (!productExists) {
        throw new BadRequestException(
          `Product with ID ${productId} does not exist`,
        );
      }
      const levelExists = await this.prisma.level.findFirst({
        where: { id: levelId },
      });

      if (!levelExists) {
        throw new BadRequestException(
          `Level with ID ${levelId} does not exist`,
        );
      }

      const newOrder = await this.prisma.order.create({
        data: {
          ...rest,
          total: TOOL_TotalPrice,
          date,
          products: {
            connect: {
              id: productId,
            },
          },
          tools: {
            connect: OrderTools.map((tool) => ({
              id: tool.toolId,
            })),
          },
          userId: req['user'].id,
          location: location,
        },
        include: {
          tools: true,
          products: true,
          users: true,
          masters: true,
        },
      });

      let user = await this.prisma.user.findFirst({where: { id: userId }});

      if (!user?.telegramChatId) {
        throw new BadRequestException(
          'User does not have a Telegram chat ID. Please send /start to bot @find_worker_bot_bot .',
        );
      }
      if (user?.telegramChatId) {
        await this.bot.sendMessageToUser(
          user.telegramChatId,
          `Buyurtma qabul qilindi! Buyurtma: ${newOrder}`,
        );
      }
      

      return {
        message:
          'Order muvaffaqiyatli yaratildi, endi sizga most workerlarni izlayapmiz',
        TOOL_TotalPrice,
        newOrder,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async ConnectWorker(data) {
    try {
      let { mastersId, orderId } = data;
      let totalCost = 0;

      const existingOrder = await this.prisma.order.findFirst({
        where: { id: orderId },
      });

      const user = await this.prisma.user.findFirst({
        where: {
          id: existingOrder?.userId ? String(existingOrder.userId) : '1',
        },
      });

      if (!existingOrder) {
        throw new BadRequestException(
          `Order with ID ${orderId} does not exist`,
        );
      }

      const orderDate = new Date(existingOrder.date);
      const currentTime = new Date();

      for (const masterId of mastersId) {
        const master = await this.prisma.master.findFirst({
          where: { id: masterId },
        });

        if (!master) {
          throw new BadRequestException(
            `Master with ID ${masterId} does not exist`,
          );
        }

        const durationMs = orderDate.getTime() - currentTime.getTime();
        if (durationMs <= 0) {
          throw new BadRequestException(`Order time must be in the future`);
        }

        const totalHours = Math.floor(durationMs / (1000 * 60 * 60));
        const fullDays = Math.floor(totalHours / 24);
        const remainingHours = totalHours % 24;

        totalCost +=
          fullDays * master.price_daily + remainingHours * master.price_hourly;

        const endDate = new Date(orderDate);

        if (currentTime >= endDate) {
          await this.prisma.master.update({
            where: { id: masterId },
            data: { isActive: false },
          });
        }
      }

      const updatedMasters = await this.prisma.master.updateMany({
        where: { id: { in: mastersId } },
        data: { isActive: false },
      });

      const newOrder = await this.prisma.order.update({
        where: { id: orderId },
        data: {
          masters: {
            connect: mastersId.map((id) => ({ id })),
          },
          total: totalCost,
          date: orderDate,
        },
        include: {
          tools: true,
          products: true,
          users: true,
          masters: true,
        },
      });
      return {
        totalCost,
        newOrder,
        updatedMasters,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let all = await this.prisma.order.findMany({
        include: {
          tools: true,
          masters: true,
        },
      });
      return all;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllMys(id: string) {
    try {
      let all = await this.prisma.order.findMany({
        where: { userId: id },
        include: {
          tools: true,
          masters: true,
        },
      });
      return all;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let one = await this.prisma.order.findFirst({
        where: { id },
        include: {
          tools: true,
          masters: true,
        },
      });
      if (!one) {
        throw new BadRequestException('Order not found');
      }
      return one;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      let updated = await this.prisma.order.update({
        where: { id },
        data: updateOrderDto,
      });
      return updated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.prisma.order.delete({
        where: { id },
      });
      return deleted;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
