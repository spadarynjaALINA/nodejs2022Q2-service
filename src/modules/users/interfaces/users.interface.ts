import { RegisterDto } from '../dto/register.dto';
import { IUser } from './user.interface';

export interface UserStore {
  all: (limit: number) => IUser[];
  findById: (id: string) => IUser;
  create: (params: RegisterDto) => IUser;
  update: (user: IUser, params: RegisterDto) => IUser;
}
