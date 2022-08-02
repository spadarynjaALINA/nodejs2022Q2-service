import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackDto } from '../dto/track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { ITrack } from '../interfaces/track.interface';
import { TracksStore } from '../interfaces/tracks.interface';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(createTracksDto: CreateTrackDto): Promise<ITrack> {
    return this.prisma.track.create({ data: createTracksDto });
  }

  async delete(id: string): Promise<ITrack> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (track) {
      await this.prisma.track.delete({ where: { id } });
      return track;
    }
  }

  async findAll(): Promise<ITrack[]> {
    return this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<TrackDto> {
    return this.prisma.track.findUnique({ where: { id } });
  }

  async update(
    updateTrackDto: UpdateTrackDto,
    id: string,
  ): Promise<ITrack | void> {
    if (await this.prisma.track.findUnique({ where: { id } })) {
      return await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
    }
  }
}
