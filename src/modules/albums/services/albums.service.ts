import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-albums.dto';
import { UpdateAlbumDto } from '../dto/update-albums.dto';
import { IAlbum } from '../interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Album } from '@prisma/client';
@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumsDto: CreateAlbumDto): Promise<IAlbum> {
    const newAlbum = {
      ...createAlbumsDto,
      id: uuidv4(),
    };
    return await this.prisma.album.create({ data: newAlbum });
  }

  async delete(id: string): Promise<Album | void> {
    const artist = await this.prisma.album.findUnique({ where: { id } });
    if (artist) {
      await this.prisma.track.updateMany({
        where: { artistId: { equals: id } },
        data: { artistId: null },
      });
      await this.prisma.album.delete({ where: { id } });
      return artist;
    }
  }

  async findAll(): Promise<IAlbum[]> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album | void> {
    return await this.prisma.album.findUnique({ where: { id } });
  }

  async update(
    updateAlbumDto: UpdateAlbumDto,
    id: string,
  ): Promise<IAlbum | void> {
    if (await this.prisma.album.findUnique({ where: { id } })) {
      await this.prisma.album.updateMany({
        where: { id },
        data: updateAlbumDto,
      });
    }
  }
}
