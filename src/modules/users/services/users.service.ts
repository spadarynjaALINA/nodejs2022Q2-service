import { Inject, Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from '../dto/password.dto';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
	constructor(@Inject('UsersStore') private storage: UsersStore) {}

  async create(RegisterDto: RegisterDto): Promise<IUser> {
    return this.storage.create(RegisterDto);
  }

  async delete(id: string): Promise<string> {
    return this.storage.delete(id);
  }

  async findAll(): Promise<IUser[]> {
    return this.storage.all();
  }

  async findOne(id: string): Promise<UserDto> {
    return this.storage.findById(id);
  }

  async update(updateUserDto: UpdatePasswordDto, id: string): Promise<IUser> {
    return this.storage.update(updateUserDto, id);
  }
}
