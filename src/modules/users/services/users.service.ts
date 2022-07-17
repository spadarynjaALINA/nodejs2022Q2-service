import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UpdatePasswordDto } from '../dto/password.dto';
import { IUser, IUserResponce } from '../interfaces/user.interface';
import { UsersStore } from './../schemas/users.interface';
@Injectable()
export class UsersService {
  constructor(@Inject('UsersStore') private storage: UsersStore) {}

  async create(loginDto: LoginDto): Promise<IUserResponce> {
    return this.storage.create(loginDto);
  }

  async delete(id: string): Promise<string | void> {
    return this.storage.delete(id);
  }

  async findAll(): Promise<IUser[]> {
    return this.storage.all();
  }

  async findOne(id: string): Promise<IUser> {
    return this.storage.findById(id);
  }

  async update(
    id: string,
    updateUserDto: UpdatePasswordDto,
  ): Promise<IUserResponce | void> {
    return this.storage.update(id, updateUserDto);
  }
}
