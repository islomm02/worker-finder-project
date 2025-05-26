import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { TokenGuard } from 'src/guards/token.guard';
import { RoleDecorator } from 'src/decorators/role-decorators';
import { UserRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    let userId = req['user'].id;
    return this.orderService.order(createOrderDto, req, userId);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(TokenGuard)
  @Get('my-orders')
  findAllMys(@Request() req) {
    let id = req['user'].id;
    return this.orderService.findAllMys(id);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @UseGuards(RoleGuard)
  @RoleDecorator(UserRole.ADMIN)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
