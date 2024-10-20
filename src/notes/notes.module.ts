import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService, PrismaService]
})
export class NotesModule {

}
// export class NotesModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes('notes')
//   }
// }