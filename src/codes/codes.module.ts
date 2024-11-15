import { Module } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CodesController } from './codes.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CodesController],
  providers: [CodesService, PrismaService],
})
export class CodesModule { }
