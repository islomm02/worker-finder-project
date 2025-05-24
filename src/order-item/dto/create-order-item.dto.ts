import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderItemDto {
  @ApiProperty()
  productId: string;
  @ApiProperty()
  prdQuantity: number;
  @ApiProperty()
  orderId: string;
  @ApiProperty()
  toolId: string;
  @ApiProperty()
  toolQuantity: number;
}
