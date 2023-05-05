import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/auth.login-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({summary:'login user'})
    @ApiResponse({status: 200, type: User})
    signIn(@Body() loginUserDto: LoginUserDto){
        return this.authService.signIn(loginUserDto);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get()
    @ApiOperation({summary: 'get authenticated user'})
    @ApiResponse({status: 200, type: User})
    getProfile(@Request() req){
        return this.usersService.getUserById(req.user.sub)
    }
}
