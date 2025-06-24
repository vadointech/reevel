import { Type } from "class-transformer";
import { IsLatitude, IsLongitude, IsNotEmptyObject, IsNumber, IsOptional, Min, ValidateNested } from "class-validator";

class CenterPointDto {
    @IsLongitude()
    longitude: number;

    @IsLatitude()
    latitude: number;
}

class CircleDto {
    @ValidateNested()
    @Type(() => CenterPointDto)
    @IsNotEmptyObject()
    center: CenterPointDto;

    @IsNumber()
    @Min(1)
    radius: number;
}

export class GetNearbyEventsDto {
    @ValidateNested()
    @Type(() => CircleDto)
    @IsNotEmptyObject()
    circle: CircleDto;

    @IsNumber()
    @IsOptional()
    @Min(1)
    take?: number;
}