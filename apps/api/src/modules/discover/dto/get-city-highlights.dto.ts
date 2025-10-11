import { IsOptional, IsString } from "class-validator";
import { RequestWithPaginationDto } from "@/dtos";

export class GetCityHighlightsDto extends RequestWithPaginationDto {
    @IsString()
    @IsOptional()
    cityId?: string;
}