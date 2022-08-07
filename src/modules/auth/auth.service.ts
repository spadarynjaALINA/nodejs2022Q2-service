import { Injectable } from '@nestjs/common';
import { LoginDto } from '../users/dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import jwt_decode from 'jwt-decode';
import 'dotenv/config';
import { ErrorHandler } from 'src/helpers/errorHandler';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
    private jwt: JwtService,
  ) {}
  error = new ErrorHandler();
  async signup(loginDto: LoginDto) {
    const user = await this.userService.create(loginDto);
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { login: loginDto.login },
    });
    if (user) {
      const pasMatch = bcrypt.compare(loginDto.password, user.password);

      if (pasMatch) {
        const { accessToken, refreshToken } = await this.getTokens(
          user.id,
          user.login,
        );
        await this.updateRtHash(user.id, refreshToken);
        return { accessToken, refreshToken };
      } else {
        return this.error.forbidden();
      }
    }
  }
  async refresh(rt: string) {
    const decoded: { sub: string; login: string } = jwt_decode(rt);
    const user = await this.prisma.user.findUnique({
      where: {
        id: decoded.sub,
      },
    });
    if (user && user.hashedRt) {
      const pasMatch = await bcrypt.compare(user.hashedRt, rt);
      if (pasMatch) {
        const tokens = await this.getTokens(user.id, user.login);
        await this.updateRtHash(user.id, tokens.refreshToken);
        return tokens;
      }
    }
  }

  async getTokens(userId: string, userLogin: string) {
    const payload = {
      sub: userId,
      email: userLogin,
    };
    const token = this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.JWT_SECRET_KEY,
    });
    const rToken = this.jwt.signAsync(payload, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
      secret: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    const [accessToken, refreshToken] = await Promise.all([token, rToken]);
    return { accessToken, refreshToken };
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await bcrypt.hash(rt, 10);
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}
