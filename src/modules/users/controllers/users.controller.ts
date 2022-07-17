import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ErrorHandler } from 'src/errorsHandler/errorHandler';
import { LoginDto } from '../dto/login.dto';
import { UpdatePasswordDto } from '../dto/password.dto';
import { RegisterDto } from '../dto/register.dto';
import { IUser, IUserResponce } from '../interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Controller('user')
export class UsersController {
  error = new ErrorHandler();
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async all(): Promise<IUser[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<void | IUser> {
    const User = await this.usersService.findOne(id);
    if (!User) return this.error.notFound('User');
    return User;
  }

  @Post()
  create(@Body() loginDto: LoginDto): Promise<IUserResponce> {
    return this.usersService.create(loginDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<string | void> {
    const user = await this.usersService.delete(id);
    if (user === null) return this.error.notFound('User');
    return user;
  }
}
