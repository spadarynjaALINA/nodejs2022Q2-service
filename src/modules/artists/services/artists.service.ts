import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistsStore } from '../schemas/artists.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { IArtist } from '../interfaces/artist.interface';
import { ArtistDto } from '../dto/artist.tdo';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { v4 as uuidv4 } from 'uuid';
import { NOTFOUND } from 'dns';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistsStore') private storage: ArtistsStore,
    private prisma: PrismaService,
  ) {}

  async create(createArtistsDto: CreateArtistDto): Promise<IArtist> {
    const newArtist = {
      ...createArtistsDto,
      id: uuidv4(),
    };
    return await this.prisma.artist.create({ data: newArtist });
  }

  async delete(id: string): Promise<Artist | void> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (artist) {
      await this.prisma.album.updateMany({
        where: { artistId: { equals: id } },
        data: { artistId: null },
      });
      await this.prisma.track.updateMany({
        where: { artistId: { equals: id } },
        data: { artistId: null },
      });
      await this.prisma.artist.delete({ where: { id } });
      return artist;
    }
  }

  async findAll(): Promise<IArtist[]> {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<ArtistDto> {
    return await this.prisma.artist.findUnique({ where: { id } });
  }

  async update(
    updateArtistDto: UpdateArtistDto,
    id: string,
  ): Promise<IArtist | void> {
    return await this.storage.update(updateArtistDto, id);
  }
}
