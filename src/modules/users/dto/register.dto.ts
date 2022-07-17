import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  id: string;
  @IsString()
  @IsNotEmpty()
  login: string;
  @Length(8)
  @IsNotEmpty()
  password: string;
  @IsInt()
  @IsNotEmpty()
  version: string;
  @IsInt()
  createdAt: number;
  @IsInt()
  updatedAt: number;
}
