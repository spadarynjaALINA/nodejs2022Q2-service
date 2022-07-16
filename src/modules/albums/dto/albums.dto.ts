import { IsInt, IsString } from 'class-validator';

export class AlbumDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsInt()
  year: number;
  @IsString()
  artistId: string | null; // refers to Artist
}
