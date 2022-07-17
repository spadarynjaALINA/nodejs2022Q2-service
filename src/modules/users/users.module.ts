import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { InMemoryUsersStore } from './store/users.storage';

@Module({
  providers: [
    UsersService,
    {
      provide: 'UsersStore',
      useClass: InMemoryUsersStore,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
