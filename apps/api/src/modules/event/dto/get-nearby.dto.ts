import { Type } from "class-transformer";
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    Min,
    Max,
} from "class-validator";

export class GetNearbyEventsDto {
    @IsString()
    @IsNotEmpty()
    tileId: string;

    @Type(() => Number)
    @Min(9)
    @Max(18)
    zoom: number;

    @IsString()
    @IsOptional()
    filter?: string;
}