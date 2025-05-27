import { IsOptional, IsString } from "class-validator";

export class InterestsFilterParamsDto {
    @IsString()
    @IsOptional()
    title_en: string;

    @IsString()
    @IsOptional()
    title_uk: string;
}