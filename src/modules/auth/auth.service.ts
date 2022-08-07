import { Injectable } from '@nestjs/common';
import { LoginDto } from '../users/dto/login.dto';

import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private jwt: JwtService,
  ) {}
  async signup(loginDto: LoginDto) {
    const user = await this.userService.create(loginDto);
    return this.signToken(user.id, user.login);
  }
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { login: loginDto.login },
    });
    if (user) {
      const pasMatch = await bcrypt.compare(user.password, loginDto.password);
      if (pasMatch) {
        return await this.signToken(user.id, user.login);
      }
    }
  }
  refresh() {
    return 'login';
  }

  async signToken(userId: string, userLogin: string) {
    const payload = {
      sub: userId,
      email: userLogin,
    };
    const token = this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });
    return {
      access_token: token,
    };
  }
}
