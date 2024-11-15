import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { PrismaService } from '../prisma.service';
import * as moment from 'moment';

@Injectable()
export class CodesService {
  constructor(private prisma: PrismaService) {}

  async findAll(language?: number, text?: string) {
    const codes = await this.prisma.codes.findMany({
      where: language
        ? { languageId: language }
        : text
          ? {
              OR: [
                {
                  title: { contains: text, mode: 'insensitive' },
                },
                {
                  description: { contains: text, mode: 'insensitive' },
                },
              ],
            }
          : {},
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        createdAt: true,
        themes: true,
        language: {
          select: {
            id: true,
            short: true,
            extention: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const data = codes.map((item) => {
      const { createdAt, language, ...values } = item;
      let dateAgo = moment(item.createdAt).fromNow();

      if (typeof item.themes == 'string') {
        values.themes = JSON.parse(item.themes);
      }

      return {
        ...values,
        languageId: item.language.id,
        short: item.language.short,
        extention: item.language.extention,
        createdAtTime: dateAgo,
      };
    });
    return data;
  }

  async create(code: CreateCodeDto, userId: number) {
    await this.prisma.codes.create({ data: { ...code, authorId: userId } });
    return 'Code created Successfully';
  }

  async update(id: number, code: UpdateCodeDto, userId: number) {
    let dateNow = new Date();
    await this.prisma.codes.update({
      data: { ...code, updatedAt: dateNow, authorId: userId },
      where: { id: id },
    });
    return 'Code updated Successfully';
  }

  async remove(id: number) {
    await this.prisma.codes.delete({ where: { id } });
    return 'Code removed Successfully';
  }
}
