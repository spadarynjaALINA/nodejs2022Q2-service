import { LoginDto } from '../dto/login.dto';
import { UpdatePasswordDto } from '../dto/password.dto';
import { IUser, IUserResponce } from '../interfaces/user.interface';

export interface UsersStore {
  all: () => IUser[];
  findById: (id: string) => IUser;
  create: (params: LoginDto) => IUserResponce;
  update: (id: string, params: UpdatePasswordDto) => IUserResponce | void;
  delete: (id: string) => string | void;
}
