import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}
