import { UpdatePasswordDto } from '../dto/password.dto';
import { RegisterDto } from '../dto/register.dto';
import { IUser } from '../interfaces/user.interface';

export interface UserStore {
  all: (limit: number) => IUser[];
  findById: (id: string) => IUser;
  create: (params: RegisterDto) => IUser;
  update: (user: IUser, params: UpdatePasswordDto) => IUser;
}
