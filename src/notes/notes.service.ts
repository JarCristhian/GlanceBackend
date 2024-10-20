import { Injectable, NotFoundException } from '@nestjs/common';
import { createNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma.service';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UserActiveI } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class NotesService {
    constructor(private prisma: PrismaService) { }

    async findAll(user: UserActiveI) {
        if (user.role == Role.ADMIN) {
            return await this.prisma.notes.findMany();
        }
        return await this.prisma.notes.findMany({ where: { authorId: user.id } });
    }

    async create(note: createNoteDto, userId: number) {
        await this.prisma.notes.create({ data: { ...note, authorId: userId } });
        return 'Note created Successfully';
    }

    async update(id: number, note: UpdateNoteDto, userId: number) {
        await this.prisma.notes.update({ data: { ...note, authorId: userId }, where: { id: id } });
        return 'Note updated Successfully';
    }

    async remove(id: number) {
        await this.prisma.notes.delete({ where: { id } });
        return 'Note removed Successfully';
    }
}
