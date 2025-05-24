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
    @ApiProperty({type: [Object],
        example: [
          {
                productId: '03fd3d33-b170-4c15-8801-6b0b85cdbc49',
                count: 2,
          },
          {
                productId: '03fd3d33-b170-4c15-8801-6b0b85cdbc49',
                count: 4,
          },
        ],
    })
    products: string[];
}

