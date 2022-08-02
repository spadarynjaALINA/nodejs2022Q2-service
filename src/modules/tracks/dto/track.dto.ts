import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class TrackDto {
  @IsString()
  @IsUUID(4)
  id: string;
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  @IsUUID(4)
  artistId: string;
  @IsString()
  @IsOptional()
  @IsUUID(4)
  albumId: string;
  @IsInt()
  duration: number;
}
