import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import { UpdatePasswordDto } from '../dto/password.dto';
import { IUserResponse } from '../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { Prisma, User } from '@prisma/client';
import { ErrorHandler } from 'src/helpers/errorHandler';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  error = new ErrorHandler();
  async create(loginDto: LoginDto): Promise<IUserResponse> {
    const newUpdate = Date.now();
    const userResponse = {
      login: loginDto.login,
      id: uuidv4(),
      version: 1,
      createdAt: newUpdate,
      updatedAt: newUpdate,
    };
    const newUser = {
      ...userResponse,
      password: loginDto.password,
    };
    await this.prisma.user.create({ data: newUser });
    return userResponse;
  }

  async delete(id: string): Promise<User | void> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user) {
      await this.prisma.user.delete({ where: { id } });
      return user;
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<IUserResponse | void | Prisma.BatchPayload> {
    const updatedUser = await this.prisma.user.findUnique({ where: { id } });
    if (updatedUser) {
      console.log(updatedUser.password, updatePasswordDto.oldPassword);
      if (updatedUser.password === updatePasswordDto.oldPassword) {
        const newUpdate = Date.now();
        await this.prisma.user.updateMany({
          where: { id },
          data: {
            password: updatePasswordDto.newPassword,
            version: updatedUser.version + 1,
            updatedAt: newUpdate,
          },
        });
        return {
          id: updatedUser.id,
          login: updatedUser.login,
          version: updatedUser.version + 1,
          createdAt: updatedUser.createdAt,
          updatedAt: newUpdate,
        };
      } else {
        return this.error.notMatch();
      }
    }
  }
}
