import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class GetCityHighlightsDto {
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsOptional()
    @Type(() => Number)
    limit: number;
}