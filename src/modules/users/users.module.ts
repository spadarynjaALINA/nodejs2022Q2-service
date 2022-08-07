import { Module } from '@nestjs/common';
import { MyLogger } from '../logger/logger.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  providers: [UsersService, MyLogger],
  controllers: [UsersController],
})
export class UsersModule {}
