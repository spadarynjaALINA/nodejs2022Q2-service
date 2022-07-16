import { Inject, Injectable } from '@nestjs/common';
import { AlbumDto } from '../dto/albums.dto';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';
import { IAlbum } from '../interfaces/album.interface';
import { AlbumsStore } from '../schemas/albums.interface';

@Injectable()
export class AlbumsService {
  constructor(@Inject('AlbumsStore') private storage: AlbumsStore) {}

  async create(createAlbumsDto: CreateAlbumDto): Promise<IAlbum> {
    return this.storage.create(createAlbumsDto);
  }

  async delete(id: string): Promise<string> {
    return this.storage.delete(id);
  }

  async findAll(): Promise<IAlbum[]> {
    return this.storage.all();
  }

  async findOne(id: string): Promise<AlbumDto> {
    return this.storage.findById(id);
  }

  async update(updateAlbumDto: UpdateAlbumDto, id: string): Promise<IAlbum> {
    return this.storage.update(updateAlbumDto, id);
  }
}
