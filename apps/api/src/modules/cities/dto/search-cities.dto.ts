import { IsInt, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class SearchCitiesDto {
    @Type(() => Number)
    @IsOptional()
    lng?: number;

    @Type(() => Number)
    @IsOptional()
    lat?: number;

    @IsString()
    @IsOptional()
    q?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;
}