import { Body, Controller, Get, Post, Query, Param, Patch, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { createNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveI } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';
import { Auth } from '../auth/decorators/auth.decorator';

@Auth(Role.ADMIN, Role.USER)
@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) { }

    @Get()
    findAllNotes(@ActiveUser() user: UserActiveI) {
        return this.notesService.findAll(user);
    }

    @Post()
    createNote(@Body() notes: createNoteDto, @ActiveUser() user: UserActiveI) {
        return this.notesService.create(notes, user.id);
    }

    @Patch(':id')
    updateNote(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @ActiveUser() user: UserActiveI) {
        return this.notesService.update(parseInt(id), updateNoteDto, user.id);
    }

    @Delete(':id')
    deleteNote(@Param('id') id: string) {
        return this.notesService.remove(+id);
    }
}
