import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffDto {
    @ApiProperty({description: 'staff name', example: 'Yuval'})
    staff_name: string;
}