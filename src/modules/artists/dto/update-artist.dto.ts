import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsOptional()
  @IsBoolean()
  grammy: boolean;
}
