import { RequestWithPaginationDto } from "@/dtos";
import { IsOptional, IsString } from "class-validator";

export class GetCityDto extends RequestWithPaginationDto {
    @IsString()
    @IsOptional()
    mapboxId?: string;
}