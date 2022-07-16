import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  id: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsInt()
  @IsOptional()
  year: number;
  @IsString()
  @IsOptional()
  artistId: string;
}
