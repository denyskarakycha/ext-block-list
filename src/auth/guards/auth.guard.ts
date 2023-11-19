import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CookieService } from '../services/cookie.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configeService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies[CookieService.tokenKey];
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const sessionInfo = await this.jwtService.verifyAsync(token, {
        secret: this.configeService.get('JWT_SECRET'),
      });

      req['session'] = sessionInfo;
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
