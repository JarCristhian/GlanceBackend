import { PartialType } from '@nestjs/mapped-types';
import { CreateLanguageDto } from './create-language.dto';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) { }
