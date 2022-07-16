import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Model } from 'mongoose';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistsStore } from '../interfaces/artists.interface';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { IArtist } from '../interfaces/artist.interface';
import { InMemoryArtistsStore } from '../store/artists.storage';
import { ArtistDto } from '../dto/artist.tdo';

@Injectable()
export class ArtistsService {
  constructor(@Inject('ArtistsStore') private storage: ArtistsStore) {}

  async create(createArtistsDto: CreateArtistDto): Promise<IArtist> {
    return this.storage.create(createArtistsDto);
  }

  async delete(id: string): Promise<string> {
    return this.storage.delete(id);
  }

  async findAll(): Promise<IArtist[]> {
    return this.storage.all();
  }

  async findOne(id: string): Promise<ArtistDto> {
    return this.storage.findById(id);
  }

  async update(updateArtistDto: UpdateArtistDto): Promise<IArtist> {
    return this.storage.update(updateArtistDto);
  }
}
