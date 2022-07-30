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

  async delete(id: string): Promise<string | void> {
    const artist = await this.storage.findById(id);
    if (!artist) throw new HttpException(NOTFOUND, 404);
    await this.storage.delete(id);
  }

  async findAll(): Promise<IArtist[]> {
    return this.storage.all();
  }

  async findOne(id: string): Promise<ArtistDto> {
    return this.storage.findById(id);
  }

  async update(
    updateArtistDto: UpdateArtistDto,
    id: string,
  ): Promise<IArtist | void> {
    return await this.storage.update(updateArtistDto, id);
  }
}
