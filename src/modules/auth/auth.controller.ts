import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginDto } from '../users/dto/login.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/services/users.service';
import { ErrorHandler } from 'src/helpers/errorHandler';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  error = new ErrorHandler();
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: LoginDto) {
    const newUser = await this.authService.signup(dto);
    return newUser || this.error.serverError();
  }

  @Post('/login')
  login(@Body() dto: LoginDto) {
    this.authService.login(dto);
  }
  @Post('/refresh')
  refresh() {
    this.authService.refresh();
  }
}
