import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginUserDto {
    @IsString()
    @ApiProperty({example: 'benji', description: 'username'})
    readonly username: string;

    @IsString()
    @ApiProperty({example: '123456', description: 'password'})
    readonly password: string;
}