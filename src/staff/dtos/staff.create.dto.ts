import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffDto {
    @ApiProperty({description: 'staff name', example: 'Yuval'})
    name: string;
}