import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  id: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
