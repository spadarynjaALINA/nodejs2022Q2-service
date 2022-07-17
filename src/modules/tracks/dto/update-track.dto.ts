import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  @IsUUID(4)
  artistId: string; // refers to Artist
  @IsString()
  @IsOptional()
  albumId: string; // refers to Album
  @IsInt()
  @IsOptional()
  duration: number; // integer number
}
