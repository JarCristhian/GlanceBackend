import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserActiveI } from '../common/interfaces/user-active.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServices: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createAuthDto: CreateAuthDto) {
    return await this.userServices.create(createAuthDto);
  }

  async loginUser(loginDto: LoginDto) {
    const user = await this.userServices.findOneByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Email not found');
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!validPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    delete user.password;

    return {
      token,
      user,
    };
  }

  async profile(user: UserActiveI) {
    const profile = await this.userServices.findProfileWithPassword(user.email);
    if (!profile) {
      throw new NotFoundException('User not found');
    }
    return profile;
  }
}
