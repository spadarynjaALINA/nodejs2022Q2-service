import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class ArtistDto {
  name: string;
  @IsBoolean()
  @IsString()
  @IsUUID(4)
  id: string;
  @IsString()
  grammy: boolean;
}
