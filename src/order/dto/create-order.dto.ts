import { ApiProperty } from '@nestjs/swagger';
import { Measure, PaymentType } from '@prisma/client';

class OrderProductDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  levelId: string;
}

class OrderToolDto {
  @ApiProperty()
  toolId: string;

  @ApiProperty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    type: Object,
    example: {
      lat: 41.3111,
      long: 69.2797,
    },
  })
  location: {
    lat: number;
    long: number;
  };

  @ApiProperty()
  address: string;

  @ApiProperty()
  date: Date;

  @ApiProperty({ enum: PaymentType })
  paymentType: PaymentType;

  @ApiProperty()
  withDelivery: boolean;

  @ApiProperty()
  commentToDelivery: string;

  @ApiProperty({ type: [OrderProductDto] })
  OrderProducts: OrderProductDto[];

  @ApiProperty({ type: [OrderToolDto] })
  OrderTools: OrderToolDto[];

  @ApiProperty({ enum: Measure })
  measure: Measure;

  @ApiProperty()
  howMuch: number;
}
