import { IsJSON, IsNumber, IsString, MinLength } from 'class-validator';
export class CreateCodeDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsString()
  @MinLength(1)
  content: string;

  @IsJSON()
  themes: object;

  @IsNumber()
  languageId: number;
}
