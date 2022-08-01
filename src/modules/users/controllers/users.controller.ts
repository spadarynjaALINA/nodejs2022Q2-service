import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { ErrorHandler } from 'src/helpers/errorHandler';
import { LoginDto } from '../dto/login.dto';
import { UpdatePasswordDto } from '../dto/password.dto';
import { RegisterDto } from '../dto/register.dto';
import { IUser, IUserResponse } from '../interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Controller('user')
export class UsersController {
  error = new ErrorHandler();
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<void | User> {
    return (
      (await this.usersService.findOne(id)) || this.error.notFound('Album')
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() loginDto: LoginDto): Promise<IUserResponse> {
    return this.usersService.create(loginDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return (
      (await this.usersService.update(id, updatePasswordDto)) ||
      this.error.notFound('User')
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<User | void> {
    return (await this.usersService.delete(id)) || this.error.notFound('User');
  }
}
