import { Injectable } from '@nestjs/common';
import { IUser, IUserResponce } from '../interfaces/user.interface';
import { UsersStore } from '../schemas/users.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from '../dto/password.dto';
import { LoginDto } from '../dto/login.dto';
import { BD } from 'src/bd';
import { ErrorHandler } from 'src/errorsHandler/errorHandler';
@Injectable()
export class InMemoryUsersStore implements UsersStore {
  bd = new BD();
  users = this.bd.users;
  error = new ErrorHandler();
  userResponce: IUserResponce = {
    id: 'id',
    login: '',
    version: 1,
    updatedAt: 1,
    createdAt: 1,
  };
  all(): IUser[] {
    return this.users;
  }
  findById(id: string): IUser | undefined {
    const User = this.users.find((User) => User.id === id);
    return User;
  }
  create(UserDto: LoginDto): IUserResponce {
    const timestamp = Date.now();
    const newUser = {
      ...UserDto,
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(newUser);
    for (const key in newUser) {
      if (key !== 'password') {
        this.userResponce[key] = newUser[key];
      }
    }
    return this.userResponce;
  }
  update(id: string, params: UpdatePasswordDto): IUserResponce | void {
    if (!this.findById(id)) {
      return this.error.notFound('user');
    } else {
      this.users.map((User) => {
        if (User.id === id) {
          if (User.password !== params.oldPassword) {
            return this.error.notMatch();
          }
          User.password = params.newPassword;
          User.version += 1;
          User.updatedAt = Date.now();
          // Object.assign(User, params);

          for (const key in User) {
            console.log(key, this.userResponce[key]);
            if (key !== 'password') {
              this.userResponce[key] = User[key];
            }
          }
        }
      });
      return this.userResponce;
    }
  }
  delete(id: string): string | void {
    const user = this.findById(id);
    this.users = this.users.filter((User) => User.id !== id);
    return !!user ? this.error.deleted('user') : null;
  }
}
