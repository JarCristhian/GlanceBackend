import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { createLovedDto, createNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveI } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  findAllNotes() {
    return this.notesService.findAll();
  }

  @Post()
  createNote(@Body() notes: createNoteDto) {
    return this.notesService.create(notes, 2);
  }

  @Auth(Role.ADMIN, Role.USER)
  @Get('me')
  findMyNotes(@ActiveUser() user: UserActiveI) {
    return this.notesService.findAll(user);
  }

  @Auth(Role.ADMIN, Role.USER)
  @Post('me')
  createMyNote(@Body() notes: createNoteDto, @ActiveUser() user: UserActiveI) {
    return this.notesService.create(notes, user.id);
  }

  @Auth(Role.ADMIN)
  @Post('loved')
  createLovedNote(@Body() loved: createLovedDto) {
    return this.notesService.createLoved(loved);
  }

  @Patch(':id')
  updateNote(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @ActiveUser() user: UserActiveI,
  ) {
    return this.notesService.update(parseInt(id), updateNoteDto, user.id);
  }

  @Delete(':id')
  removeNote(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
