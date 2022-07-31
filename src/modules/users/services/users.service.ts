import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import { UpdatePasswordDto } from '../dto/password.dto';
import { IUser, IUserResponce } from '../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(loginDto: LoginDto): Promise<User> {
    const newUser = {
      ...loginDto,
      id: uuidv4(),
    };
    return await this.prisma.user.create({ data: newUser });
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
  ): Promise<IUserResponce | void> {
    if (await this.prisma.user.findUnique({ where: { id } })) {
      await this.prisma.user.updateMany({
        where: { id },
        data: updatePasswordDto,
      });
    }
  }
}
