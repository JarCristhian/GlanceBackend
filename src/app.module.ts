import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LanguagesModule } from './languages/languages.module';
import { GatewayModule } from './websockets/websocket.module';
import { CodesModule } from './codes/codes.module';

@Module({
  imports: [NotesModule, LanguagesModule, UsersModule, AuthModule, GatewayModule, CodesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
