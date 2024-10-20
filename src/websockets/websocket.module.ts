import { Module } from '@nestjs/common';
import { WebsocketController } from './websocket.controller';
import { WebsocketService } from './websocket.service';
import { PrismaService } from '../prisma.service';
import { LanguagesModule } from 'src/languages/languages.module';

@Module({
  imports: [LanguagesModule],
  controllers: [],
  providers: [WebsocketController, WebsocketService, PrismaService]
})

export class GatewayModule { }