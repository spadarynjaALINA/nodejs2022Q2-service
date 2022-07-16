import { v4 as uuidv4 } from 'uuid';
import { ArtistsStore } from '../interfaces/artists.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { IArtist } from '../interfaces/artist.interface';
import { Injectable } from '@nestjs/common';
import { ArtistDto } from '../dto/artist.tdo';
@Injectable()
export class InMemoryArtistsStore implements ArtistsStore {
  private artists: ArtistDto[] = [
    {
      name: 'name',
      id: '085f7d32-10c5-476e-9803-169dcb663e30',
      grammy: true,
      version: 1,
      createdAt: 1657961818145,
      updatedAt: 1657961818145,
    },
  ];

  all(): IArtist[] {
    return this.artists;
  }
  findById(id: string): ArtistDto | undefined {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist;
  }
  create(artistDto: CreateArtistDto): IArtist {
    const timestamp = Date.now();
    const newArtist = {
      ...artistDto,
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.artists.push(newArtist);
    return newArtist;
  }
  update(params: UpdateArtistDto, id: string): ArtistDto {
    this.artists = this.artists.map((artist) => {
      if (artist.id === id) {
        artist.version += 1;
        artist.updatedAt = Date.now();
        return Object.assign(artist, params);
      }
      return artist;
    });
    return this.findById(params.id);
  }
  delete(id: string): string {
    const artist = this.findById(id);
    this.artists = this.artists.filter((artist) => artist.id !== id);
    return !!artist ? `Artist with id ${id} has been deleted` : null;
  }
}
