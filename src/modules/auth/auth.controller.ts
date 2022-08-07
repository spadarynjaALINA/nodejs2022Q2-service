import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginDto } from '../users/dto/login.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/services/users.service';
import { ErrorHandler } from 'src/helpers/errorHandler';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  error = new ErrorHandler();
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: LoginDto) {
    const newUser = await this.authService.signup(dto);
    return newUser || this.error.serverError();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const tokens = await this.authService.login(dto);
    return tokens;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body()
    rt: string,
  ) {
    return await this.authService.refresh(rt);
  }
}
