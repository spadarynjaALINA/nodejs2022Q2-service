import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  artistId: string;
  @IsString()
  @IsOptional()
  albumId: string;
  @IsInt()
  @IsOptional()
  duration: number;
}
