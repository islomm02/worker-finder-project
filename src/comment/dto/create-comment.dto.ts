import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  message: string;
  @ApiProperty()
  masterId: string;
  @ApiProperty()
  star: number;
}
