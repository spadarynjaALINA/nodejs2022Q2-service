import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class ArtistDto {
  @IsString()
  @IsUUID(4)
  id: string;
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}
