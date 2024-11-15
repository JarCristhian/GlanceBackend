import { Transform } from "class-transformer";
import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateLanguageDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    short: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    extention: string;

    @IsNumber()
    type: number;

    reference?: number | null;
}
