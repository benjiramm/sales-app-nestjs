import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Date } from "mongoose";

export class CreateLogDto {
    @ApiProperty({description: 'id of staff who sold', example: '63f7b1c5968181dc966f3478'})
    staff: string

    @ApiProperty({description: 'id of item sold', example: '63f7b1fb968181dc966f3481'})
    item: string

    @ApiProperty({description: 'type of shift (morning/evening)', example: 'evening'})
    shift_type: string

    @ApiProperty({description: 'amount of items sold during shift', example: '3'})
    amount: number

    @ApiProperty({description: 'corresponding date of shift', example: '08-05-2023'})
    date: string
}