import { Injectable } from '@nestjs/common';
import { createLovedDto, createNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma.service';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UserActiveI } from '../common/interfaces/user-active.interface';
import * as moment from 'moment';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findAll(user?: UserActiveI) {
    const notes = await this.prisma.notes.findMany({
      where: user ? { authorId: user.id } : {},
      select: {
        id: true,
        title: true,
        description: true,
        tags: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
        loved: {
          select: {
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const data = notes.map((item) => {
      const { createdAt, user, loved, ...values } = item;
      let dateAgo = moment(item.createdAt).fromNow();
      const lovedStatus = loved.length > 0 ? loved[0].status : false;
      return {
        ...values,
        loved: lovedStatus,
        author: item.user.name,
        createdAtTime: dateAgo,
      };
    });
    return data;
  }

  async create(note: createNoteDto, userId: number) {
    await this.prisma.notes.create({ data: { ...note, authorId: userId } });
    return 'Note created Successfully';
  }

  async createLoved(loved: createLovedDto) {
    const noteLoved = await this.prisma.loved.findFirst({
      where: { noteId: loved.noteId },
    });
    if (noteLoved) {
      await this.prisma.loved.update({
        where: { id: noteLoved.id },
        data: { ...createLovedDto, status: !noteLoved.status },
      });
      return 'Loved update Successfully';
    } else {
      await this.prisma.loved.create({ data: { ...loved, status: true } });
      return 'Loved created Successfully';
    }
  }

  async update(id: number, note: UpdateNoteDto, userId: number) {
    await this.prisma.notes.update({
      data: { ...note, authorId: userId },
      where: { id: id },
    });
    return 'Note updated Successfully';
  }

  async remove(id: number) {
    await this.prisma.notes.delete({ where: { id } });
    return 'Note removed Successfully';
  }
}
