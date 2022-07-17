import { Injectable } from '@nestjs/common';
import { AlbumDto } from '../dto/albums.dto';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';
import { IAlbum } from '../interfaces/album.interface';
import { AlbumsStore } from '../schemas/albums.interface';
import { v4 as uuidv4 } from 'uuid';
import { BD } from 'src/bd';
import { ErrorHandler } from 'src/errorsHandler/errorHandler';
@Injectable()
export class InMemoryAlbumsStore implements AlbumsStore {
  bd = new BD();
  albums = this.bd.albums;
  error = new ErrorHandler();
  all(): IAlbum[] {
    return this.albums;
  }
  findById(id: string): AlbumDto | undefined | void {
    const Album = this.albums.find((Album) => Album.id === id);
    return Album ?? this.error.notFound('album');
  }
  create(AlbumDto: CreateAlbumDto): IAlbum {
    const newAlbum = {
      ...AlbumDto,
      id: uuidv4(),
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }
  update(params: UpdateAlbumDto, id: string): AlbumDto | void {
    if (!this.findById(id)) {
      return this.error.notFound('album');
    } else {
      this.albums = this.albums.map((Album) => {
        if (Album.id === id) {
          return Object.assign(Album, params);
        }
        return Album;
      });
      return this.findById(id);
    }
  }
  async delete(id: string): Promise<string | void> {
    const album = this.albums.find((Album) => Album.id === id);
    console.log(album, '- album');
    if (!!album) {
      this.bd.tracks.forEach((track) => {
        if (track.albumId === id) track.albumId = null;
      });
      this.bd.favorites.albums.forEach((item) => {
        if (item === id) {
          this.bd.favorites.albums.splice(
            this.bd.favorites.albums.indexOf(id),
            1,
          );
        }
      });
      this.albums = this.albums.filter((Album) => Album.id !== id);

      return this.error.deleted('albums');
    } else {
      return this.error.notFound('albums');
    }
  }
}
