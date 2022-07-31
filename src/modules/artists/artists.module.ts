import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistsController } from './controllers/artists.controller';
import { ArtistsService } from './services/artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [PrismaService, ArtistsService],
})
export class ArtistsModule {}
