import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @Length(8)
  oldPassword: string;
  newPassword: string;
}
