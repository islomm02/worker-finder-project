import { ApiProperty } from "@nestjs/swagger";

export class CreateFaqDto {
    @ApiProperty()
    question: string;
    @ApiProperty()
    answers: string;
}
