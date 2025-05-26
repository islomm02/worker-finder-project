import { ApiProperty } from "@nestjs/swagger";

export class CreateBasketDto {
  @ApiProperty()
  productId: string;
  @ApiProperty()
  prdQuantity: number;
  @ApiProperty()
  toolId: string;
  @ApiProperty()
  toolQuantity: number;
}
