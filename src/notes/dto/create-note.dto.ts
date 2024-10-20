import { IsDateString, IsNumber, IsString, MinLength } from "class-validator";

export class createNoteDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    description: string;

    @IsString()
    @MinLength(1)
    content: string;

    @IsNumber()
    languageId: number;
}