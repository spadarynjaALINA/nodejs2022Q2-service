@Injectable()
export class InMemoryUsersStore implements UsersStore {
  private Users: UserDto[] = [
    {
      name: 'name',
      id: '085f7d32-10c5-476e-9803-169dcb663e30',
      grammy: true,
      version: 1,
      createdAt: 1657961818145,
      updatedAt: 1657961818145,
    },
  ];

  all(): IUser[] {
    return this.Users;
  }
  findById(id: string): UserDto | undefined {
    const User = this.Users.find((User) => User.id === id);
    return User;
  }
  create(UserDto: CreateUserDto): IUser {
    const timestamp = Date.now();
    const newUser = {
      ...UserDto,
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.Users.push(newUser);
    return newUser;
  }
  update(params: UpdateUserDto, id: string): UserDto {
    this.Users = this.Users.map((User) => {
      if (User.id === id) {
        User.version += 1;
        User.updatedAt = Date.now();
        return Object.assign(User, params);
      }
      return User;
    });
    return this.findById(params.id);
  }
  delete(id: string): string {
    const User = this.findById(id);
    this.Users = this.Users.filter((User) => User.id !== id);
    return !!User ? `User with id ${id} has been deleted` : null;
  }
}
