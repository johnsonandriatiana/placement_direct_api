import { ApiProperty } from "@nestjs/swagger";

export class UserContractDto {
    @ApiProperty()
    userId: string;
    @ApiProperty({ type: [String] })
    contractIds: string[];
}