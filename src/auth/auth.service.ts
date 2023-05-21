import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { use } from 'passport';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dtos/auth.login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.getUserByUsername(
      loginUserDto.username,
    );
    if (!user) {
      // user doesn't exist
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const isPasswordMatching = await compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      // user exists but password is incorrect
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const payload = {
      username: user.username,
      sub: user._id,
      is_admin: user.is_admin,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
