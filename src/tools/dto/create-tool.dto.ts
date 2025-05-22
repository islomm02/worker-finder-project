import { ApiProperty } from "@nestjs/swagger";

export class CreateToolDto {
    @ApiProperty()
    name_uz: string
    @ApiProperty()
    name_ru: string
    @ApiProperty()
    name_en: string
    @ApiProperty()
    description_uz: string
    @ApiProperty()
    description_ru: string
    @ApiProperty()
    description_en: string
    @ApiProperty()
    price: number
    @ApiProperty()
    quantity: number
    @ApiProperty()
    code: string
    @ApiProperty()
    brandId: string
    @ApiProperty()
    isActive: boolean
    @ApiProperty()
    capacityId: string
    @ApiProperty()
    sizeId: string
    @ApiProperty()
    image: string
}
