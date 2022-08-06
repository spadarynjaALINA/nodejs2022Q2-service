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
  UseFilters,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { ErrorHandler } from 'src/helpers/errorHandler';
import { strGenerate } from 'src/helpers/str-generate';
import { HttpExceptionFilter } from 'src/modules/logger/httpexception-filter.service';
import { MyLogger } from 'src/modules/logger/logger.service';
import { LoginDto } from '../dto/login.dto';
import { UpdatePasswordDto } from '../dto/password.dto';

import { IUserResponse } from '../interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UsersController {
  error = new ErrorHandler();
  strGenerate = new strGenerate();
  constructor(
    private readonly usersService: UsersService,
    private myLogger: MyLogger,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async all(): Promise<User[]> {
    const args = [`user/`, 'GET', 'user'];
    const msg = this.strGenerate.getVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.usersService.findAll()) {
      const msg = this.strGenerate.getLog(args);
      this.myLogger.log(msg);
      return await this.usersService.findAll();
    } else {
      this.error.serverError();
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<void | User> {
    const args = [`user/${id}`, 'GET', 'user', id];
    const msg = this.strGenerate.getVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.usersService.findOne(id)) {
      const msg = this.strGenerate.getLog(args);
      this.myLogger.log(msg);
      return await this.usersService.findOne(id);
    } else {
      this.error.notFound('user', id);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() loginDto: LoginDto): Promise<IUserResponse> {
    const args = [`user/`, 'POST', 'user', JSON.stringify(loginDto)];
    const msg = this.strGenerate.postVerbose(args);
    this.myLogger.verbose(msg);
    if (this.usersService.create(loginDto)) {
      const msg = this.strGenerate.postLog(args);
      this.myLogger.log(msg);
      return this.usersService.create(loginDto);
    } else {
      this.error.serverError();
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const args = [`user/${id}`, 'PUT', 'user', id];
    const msg = this.strGenerate.putVerbose(args);
    this.myLogger.verbose(msg);
    const user = await this.usersService.update(id, updatePasswordDto);
    console.log(user);
    if (user) {
      const msg = this.strGenerate.putLog(args);
      this.myLogger.log(msg);
      return user;
    }
    this.error.notFound('user', id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<User | void> {
    const args = [`user/${id}`, 'DELETE', 'user', id];
    const msg = this.strGenerate.deleteVerbose(args);
    this.myLogger.verbose(msg);
    if (await this.usersService.delete(id)) {
      const msg = this.strGenerate.deleteLog(args);
      this.myLogger.log(msg);
      return await this.usersService.delete(id);
    } else {
      this.error.notFound('user', id);
    }
  }
}
