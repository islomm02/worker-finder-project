import { ApiProperty } from "@nestjs/swagger";
import { Measure, PaymentType } from "@prisma/client";

export class CreateOrderDto {
  @ApiProperty({
    type: [Object],
    example: {
      lat: '18654',
      long: '18654',
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

  @ApiProperty({
    type: [Object],
    example: [
      {
        productId: '03fd3d33-b170-4c15-8801-6b0b85cdbc49',
        count: 5,
      },
      {
        toolId: '03fd3d33-b170-4c15-8801-6b0b85cdbc49',
        count: 5,
      },
    ],
  })
  OrderItems: string[];
  @ApiProperty({ enum: Measure})
  measure: string;
  @ApiProperty()
  howMuch: number;
}
