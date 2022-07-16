import { Injectable } from '@nestjs/common';
import { AlbumDto } from '../dto/albums.dto';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';
import { IAlbum } from '../interfaces/album.interface';
import { AlbumsStore } from '../schemas/albums.interface';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class InMemoryAlbumsStore implements AlbumsStore {
  private Albums: AlbumDto[] = [
    {
      name: 'name',
      id: 'cc2b06d7-4906-4a19-9935-06e9de2f9e23',
      year: 2002,
      artistId: null,
    },
  ];

  all(): IAlbum[] {
    return this.Albums;
  }
  findById(id: string): AlbumDto | undefined {
    const Album = this.Albums.find((Album) => Album.id === id);
    return Album;
  }
  create(AlbumDto: CreateAlbumDto): IAlbum {
    const newAlbum = {
      ...AlbumDto,
      id: uuidv4(),
    };
    this.Albums.push(newAlbum);
    return newAlbum;
  }
  update(params: UpdateAlbumDto, id: string): AlbumDto {
    this.Albums = this.Albums.map((Album) => {
      if (Album.id === id) {
        return Object.assign(Album, params);
      }
      return Album;
    });
    return this.findById(params.id);
  }
  delete(id: string): string {
    const Album = this.findById(id);
    this.Albums = this.Albums.filter((Album) => Album.id !== id);
    return !!Album ? `Album with id ${id} has been deleted` : null;
  }
}
