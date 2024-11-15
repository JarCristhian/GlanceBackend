import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class createNoteDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsArray()
  tags: [];
}

export class createLovedDto {
  @IsNumber()
  noteId: number;
}
