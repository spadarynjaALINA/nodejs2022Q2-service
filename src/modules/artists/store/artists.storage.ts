import { v4 as uuidv4 } from 'uuid';
import { ArtistsStore } from '../schemas/artists.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { IArtist } from '../interfaces/artist.interface';
import { Injectable } from '@nestjs/common';
import { ArtistDto } from '../dto/artist.tdo';
import { BD } from 'src/bd';
import { ErrorHandler } from 'src/errorsHandler/errorHandler';
@Injectable()
export class InMemoryArtistsStore implements ArtistsStore {
  bd = new BD();
  artists = this.bd.artists;
  error = new ErrorHandler();
  all(): IArtist[] {
    return this.artists;
  }
  findById(id: string): ArtistDto | undefined {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist;
  }
  create(artistDto: CreateArtistDto): IArtist {
    const newArtist = {
      ...artistDto,
      id: uuidv4(),
    };
    this.artists.push(newArtist);
    return newArtist;
  }
  async update(params: UpdateArtistDto, id: string): Promise<void | ArtistDto> {
    if (!this.findById(id)) {
      return this.error.notFound('artist');
    } else {
      this.artists = this.artists.map((artist) => {
        if (artist.id === id) {
          return Object.assign(artist, params);
        }
        return artist;
      });
      console.log(this.findById(id));
      return this.findById(id);
    }
  }
  delete(id: string): string | void {
    const artist = this.findById(id);
    console.log(artist);
    if (!!artist) {
      this.bd.albums.forEach((album) => {
        if (album.artistId === id) album.artistId = null;
      });
      this.bd.tracks.forEach((track) => {
        console.log(track.artistId, id);
        if (track.artistId === id) track.artistId = null;
      });
      this.bd.favorites.artists.forEach((item) => {
        if (item === id) {
          this.bd.favorites.artists.splice(
            this.bd.favorites.artists.indexOf(id),
            1,
          );
        }
      });
      this.artists = this.artists.filter((artist) => artist.id !== id);
    }

    return !!artist ? this.error.deleted('artist') : null;
  }
}
