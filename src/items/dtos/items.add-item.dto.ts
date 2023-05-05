import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateItemDto {
    @ApiProperty({description: 'item name', example: 'cocktail'})
    @IsString()
    name: string

    @ApiProperty({description: 'value of item in a morning shift', example: 5})
    @IsNumber()
    value_morning: number

    @ApiProperty({description: 'value of item in a evening shift', example: 3})
    @IsNumber()
    value_evening: number

    @ApiProperty({description: 'string representing the font awesome icon', example: 'fa-martini-glass'})
    icon: string
}