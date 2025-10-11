import { RequestWithPaginationDto, RequestWithViewportDto } from "@/dtos";
import { IsOptional, IsString } from "class-validator";

export class GetEventsDto extends RequestWithPaginationDto {
    @IsString()
    @IsOptional()
    cityId?: string;

    @IsString()
    @IsOptional()
    interestId?: string;
}

export class GetNearbyEventsDto extends RequestWithViewportDto {
    @IsString()
    @IsOptional()
    cityId?: string;

    @IsString()
    @IsOptional()
    interestId?: string;
}