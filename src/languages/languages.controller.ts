import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveI } from '../common/interfaces/user-active.interface';

@Auth(Role.ADMIN)
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) { }

  @Get()
  findAllLanguages() {
    return this.languagesService.findAll();
  }

  @Post()
  createLanguage(@Body() createLanguageDto: CreateLanguageDto, @ActiveUser() user: UserActiveI) {
    return this.languagesService.create(createLanguageDto, user.id);
  }

  @Patch(':id')
  updateLanguage(@Param('id') id: string, @Body() updateLanguageDto: UpdateLanguageDto, @ActiveUser() user: UserActiveI) {
    return this.languagesService.update(+id, updateLanguageDto, user.id);
  }

  @Delete(':id')
  removeLanguage(@Param('id') id: string) {
    return this.languagesService.remove(+id);
  }
}
