import { ApiProperty } from "@nestjs/swagger";

export class ContractDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    content: string;
}