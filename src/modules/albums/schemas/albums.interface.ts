import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';
import { IAlbum } from '../interfaces/album.interface';

export interface AlbumsStore {
  all: () => IAlbum[];
  findById: (id: string) => IAlbum;
  create: (params: CreateAlbumDto) => IAlbum;
  update: (params: UpdateAlbumDto, id: string) => IAlbum;
  delete: (id: string) => string;
}
