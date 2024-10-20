import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.users.findMany({ omit: { password: true, } });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    createUserDto.password = await this.hashPassword(createUserDto.password);
    await this.prisma.users.create({ data: createUserDto });

    return 'User created Successfully';
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.prisma.users.update({ data: updateUserDto, where: { id: id } });
    return 'User update Successfully';
  }

  async remove(id: number) {
    await this.prisma.users.delete({ where: { id: id } });
    return 'User removed Successfully';
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({ where: { id: id } });
  }

  findProfileWithPassword(email: string) {
    return this.prisma.users.findUnique({ where: { email: email }, select: { id: true, name: true, email: true, password: true, role: true } });
  }

  async findOneByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async hashPassword(password: String) {
    const pass = await bcrypt.hash(password, 10);
    return pass;
  }
}
