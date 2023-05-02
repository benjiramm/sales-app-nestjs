import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/users.create.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    @Inject()
    usersService: UsersService;

    @Get()
    @ApiOperation({summary: 'get all users'})
    @ApiResponse({status: 200, type: Array<User>})
    getAllUsers() {
        return this.usersService.getAllUsers()
    }

}
