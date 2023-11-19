import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { PasswordService } from './services';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string }> {
    const { email, password } = signUpDto;

    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new BadRequestException('Email exists');
    }

    const salt = await this.passwordService.getSalt();
    const hash = await this.passwordService.getHash(password, salt);

    const newUser = await this.userService.create(email, hash, salt);

    const accessToken = await this.jwtService.signAsync({
      userId: newUser.id,
      email: newUser.email,
    });

    return { accessToken };
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Check your credentials');
    }

    const hash = await this.passwordService.getHash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException('Check your credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      userId: user.id,
      email: user.email,
    });

    return { accessToken };
  }
  signOut() {}
}
