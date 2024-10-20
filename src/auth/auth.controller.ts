import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { UserActiveI } from '../common/interfaces/user-active.interface';
import { ActiveUser } from '../common/decorators/active-user.decorator';

// // interface RequestWithUser extends Request {
// //   user: {
// //     email: string;
// //     role: string;
// //   }
// // }

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.createUser(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }

  // @Get('profile')
  // @Roles(Role.ADMIN, Role.USER)
  // @UseGuards(AuthGuard, RolesGuard)
  // Profile(@Req() req: RequestWithUser) {
  //   return req.user;
  // }

  @Get('profile')
  @Auth(Role.ADMIN, Role.USER)
  Profile(@ActiveUser() user: UserActiveI) {
    return this.authService.profile(user);
  }
}
