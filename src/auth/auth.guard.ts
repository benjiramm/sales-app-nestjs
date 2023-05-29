import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    /* GRAB THE JWT FROM THE REQUEST HEADER */
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log(token);
    return type === 'Bearer' ? token : undefined;

    /* GRAB THE JWT FROM THE COOKIES */
    // checking if token exists and passing that on  to the validation stage
    // const token = request.cookies.token;
    // return token ? token : null;
  }
}
