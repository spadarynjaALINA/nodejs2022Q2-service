import { Module } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshStrategy } from './strategy/refresh-jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, UsersService, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
