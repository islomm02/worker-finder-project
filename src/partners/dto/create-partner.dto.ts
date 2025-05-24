import { ApiProperty } from "@nestjs/swagger";

export class CreatePartnerDto {
    @ApiProperty()
    name_uz: string
    
    @ApiProperty()
    name_ru: string
    @ApiProperty()
    name_en: string
    @ApiProperty()
    image: string

}
