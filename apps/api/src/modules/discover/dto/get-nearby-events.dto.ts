import { IsOptional, IsString } from "class-validator";
import { RequestWithViewportDto } from "@/dtos";

export class GetNearbyEventsDto extends RequestWithViewportDto {
    @IsString()
    @IsOptional()
    interestId?: string;
}