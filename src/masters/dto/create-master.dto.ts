import { ApiProperty } from "@nestjs/swagger";

export class CreateMasterDto {
    @ApiProperty()
    fullName: string
    @ApiProperty()
    phone: string
    @ApiProperty()
    isActive: boolean
    @ApiProperty()
    year: number
    @ApiProperty()
    minWorkingHour: number
    @ApiProperty()
    levelId: string
    @ApiProperty()
    price_hourly: number
    @ApiProperty()
    price_daily: number
    @ApiProperty()
    expirience: string
    @ApiProperty()
    image: string
    @ApiProperty()
    passportImage: string
    @ApiProperty()
    about: string
}

