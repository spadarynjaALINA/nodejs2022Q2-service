import { IsBoolean, IsInt, IsString } from 'class-validator';

export class ArtistDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
  @IsInt()
  version: number; // integer number, increments on update
  @IsInt()
  createdAt: number;
  // timestamp of creation
  @IsInt()
  updatedAt: number; // timestamp of last update
}
