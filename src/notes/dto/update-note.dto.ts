import { PartialType } from '@nestjs/mapped-types';
import { createNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(createNoteDto) { }
