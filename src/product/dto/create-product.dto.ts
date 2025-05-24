import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty()
  name_uz: string;
  @ApiProperty()
  name_ru: string;
  @ApiProperty()
  name_en: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  minWorkingHour: number;
  @ApiProperty({ example: '03fd3d33-b170-4c15-8801-6b0b85cdbc49' })
  levelId: string;
  @ApiProperty()
  price_hourly: number;
  @ApiProperty()
  price_daily: number;
}
