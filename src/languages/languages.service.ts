import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LanguagesService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.languages.findMany();
  }

  async create(createLanguageDto: CreateLanguageDto, userId: number) {
    const language = await this.findOneByName(createLanguageDto.name);
    if (language) {
      throw new BadRequestException('Language already exists');
    }

    await this.prisma.languages.create({ data: { ...createLanguageDto, authorId: userId } });
    return 'Language created Successfully';
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto, userId: number) {
    await this.prisma.languages.update({ data: { ...updateLanguageDto, authorId: userId }, where: { id } });
    return 'Language update Successfully';
  }

  async remove(id: number) {
    await this.prisma.languages.delete({ where: { id } });
    return 'Language removed Successfully';
  }

  async findOneByName(name: string) {
    return this.prisma.languages.findUnique({ where: { name } });
  }

  findOne(id: number) {
    return this.prisma.languages.findUnique({ where: { id } });
  }
}
