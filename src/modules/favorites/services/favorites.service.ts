import { Injectable } from '@nestjs/common';
import { Album, Artist, Favorites, Track } from '@prisma/client';
import { addFavs } from 'src/helpers/addFav';
import { updateFavs } from 'src/helpers/updateFavs';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { FavoritesSelect } from '../interfaces/favorite.interface';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async add(type: string, id: string): Promise<Artist | Album | Track> {
    switch (type) {
      case 'artist':
        return await addFavs(this.prisma.artist, id);
      case 'album':
        return await addFavs(this.prisma.album, id);
      case 'track':
        await addFavs(this.prisma.track, id);
      default:
        break;
    }
  }

  async delete(type: string, id: string): Promise<Favorites | void> {
    const types =
      type === 'artist'
        ? this.prisma.artist
        : 'album'
        ? this.prisma.album
        : this.prisma.track;
    return await updateFavs(types, id);
  }

  async findAll() {
    const artist = { id: true, name: true, grammy: true };
    const album = { id: true, name: true, year: true, artistId: true };
    const track = {
      id: true,
      name: true,
      duration: true,
      artistId: true,
      albumId: true,
    };
    return (
      (await this.prisma.favorites.findFirst({
        select: {
          albums: { select: album },
          artists: { select: artist },
          tracks: { select: track },
        },
      })) ?? { artists: [], albums: [], tracks: [] }
    );
  }
}
