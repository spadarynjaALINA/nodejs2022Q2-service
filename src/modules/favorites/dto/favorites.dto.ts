import { IsArray } from 'class-validator';

export class FavoriteDto {
  @IsArray()
  artists: string[];
  @IsArray()
  albums: string[];
  @IsArray()
  tracks: string[];
}
