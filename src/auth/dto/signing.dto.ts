import { ApiProperty } from "@nestjs/swagger";

export class SigningDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}