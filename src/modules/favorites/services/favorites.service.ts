import { Injectable } from '@nestjs/common';
import { Favorites } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async add(type: string, id: string) {
    switch (type) {
      case 'artist':
        if (await this.prisma.artist.findUnique({ where: { id } })) {
          const favorites =
            (await this.prisma.favorites.findFirst()) ||
            (await this.prisma.favorites.create({ data: {} }));
          const favoritesId = favorites.id;
          return await this.prisma.artist.update({
            where: { id },
            data: { favoriteId: favoritesId },
          });
        }
      case 'album':
        if (await this.prisma.album.findUnique({ where: { id } })) {
          const favorites =
            (await this.prisma.favorites.findFirst()) ||
            (await this.prisma.favorites.create({ data: {} }));
          const favoritesId = favorites.id;
          return this.prisma.album.update({
            where: { id },
            data: { favoriteId: favoritesId },
          });
        }
      case 'track':
        if (await this.prisma.track.findUnique({ where: { id } })) {
          const favorites =
            (await this.prisma.favorites.findFirst()) ||
            (await this.prisma.favorites.create({ data: {} }));
          const favoritesId = favorites.id;
          return await this.prisma.track.update({
            where: { id },
            data: { favoriteId: favoritesId },
          });
        }
      default:
        break;
    }
  }

  async delete(type: string, id: string): Promise<Favorites | void> {
    switch (type) {
      case 'artist':
        return await this.prisma.artist.update({
          where: { id },
          data: { favoriteId: { set: null } },
        });

      case 'album':
        return await this.prisma.album.update({
          where: { id },
          data: { favoriteId: { set: null } },
        });

      case 'track':
        return await this.prisma.track.update({
          where: { id },
          data: { favoriteId: { set: null } },
        });

      default:
        break;
    }
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
