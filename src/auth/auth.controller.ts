import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/users.create.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() registrationData : CreateUserDto){
        return this.authService.register(registrationData);
    }

    @Post('login')
    async login(@Body() loginData : CreateUserDto){
        // login user
    }
}
