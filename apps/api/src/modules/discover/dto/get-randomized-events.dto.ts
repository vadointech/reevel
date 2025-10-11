import { RequestWithPaginationDto } from "@/dtos";
import { IsOptional, IsString } from "class-validator";

export class GetRandomizedEventsDto extends RequestWithPaginationDto {
    @IsString()
    @IsOptional()
    cityId?: string;

    @IsString()
    @IsOptional()
    interestId?: string;
}