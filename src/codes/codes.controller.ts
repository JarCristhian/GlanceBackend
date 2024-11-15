import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CodesService } from './codes.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveI } from '../common/interfaces/user-active.interface';

@Auth(Role.ADMIN)
@Controller('codes')
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

  @Get()
  findAllCodes() {
    return this.codesService.findAll();
  }

  @Get('search')
  findCodes(@Query('language') language: string, @Query('text') text: string) {
    return this.codesService.findAll(+language, text);
  }

  @Post()
  createCode(
    @Body() createCodeDto: CreateCodeDto,
    @ActiveUser() user: UserActiveI,
  ) {
    return this.codesService.create(createCodeDto, user.id);
  }

  @Patch(':id')
  updateCode(
    @Param('id') id: string,
    @Body() updateCodeDto: UpdateCodeDto,
    @ActiveUser() user: UserActiveI,
  ) {
    return this.codesService.update(+id, updateCodeDto, user.id);
  }

  @Delete(':id')
  removeCode(@Param('id') id: string) {
    return this.codesService.remove(+id);
  }
}
