import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginUserDto } from 'src/auth/dtos/auth.login-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200, type: Array<User> })
  @ApiBearerAuth()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'register a new user' })
  @ApiResponse({ status: 201, type: User })
  @ApiBearerAuth()
  registerNewUser(@Req() req, @Body() loginUserDto: LoginUserDto) {
    if (!req.user.is_admin) {
      throw new UnauthorizedException();
    }

    return this.usersService.create(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':user_id')
  @ApiOperation({ summary: 'delete specific user' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  deleteUser(@Param('user_id') user_id: string, @Req() req) {
    if (!req.user.is_admin) {
      throw new UnauthorizedException();
    }
    return this.usersService.deleteUserById(user_id);
  }
}
