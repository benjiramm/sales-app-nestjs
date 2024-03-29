import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { use } from 'passport';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dtos/auth.login-user.dto';
import { Response } from 'express';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: LoginUserDto, response: Response): Promise<any> {
    const user = await this.usersService.getUserByUsername(
      loginUserDto.username,
    );
    if (!user) {
      // user doesn't exist
      throw new HttpException(
        'שם משתמש או סיסמא אינם תקינים',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordMatching = await compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      // user exists but password is incorrect
      throw new HttpException(
        'שם משתמש או סיסמא אינם תקינים',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      username: user.username,
      sub: user._id,
      is_admin: user.is_admin,
    };

    const jwt = await this.jwtService.signAsync(payload);

    response.cookie('token', jwt, {
      expires: new Date(new Date().getTime() + 30 * 1000 * 60), //1 hour
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return response.send('logged in successfully');
  }

  public async getUserFromAuthenticationToken(token: string): Promise<User> {
    try {
      console.log('====TOKEN====', token);
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      if (payload.sub) {
        return this.usersService.getUserById(payload.sub);
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
