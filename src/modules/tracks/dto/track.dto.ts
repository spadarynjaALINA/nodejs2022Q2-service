import { IsInt, IsOptional, IsString } from 'class-validator';

export class TrackDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  artistId: string;
  @IsString()
  @IsOptional()
  albumId: string;
  @IsInt()
  duration: number;
}
