import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateProfileDto {
    @IsString()
    @IsOptional()
    fullName?: string;

    @IsString()
    @IsOptional()
    bio?: string;

    @IsString()
    @IsOptional()
    picture?: string;

    @IsArray()
    @IsOptional()
    interests?: string[];

    @IsString()
    @IsOptional()
    locationId?: string;

    @IsString()
    @IsOptional()
    locationName?: string;

    @IsArray()
    @IsOptional()
    @ArrayMinSize(4)
    @ArrayMaxSize(4)
    @IsNumber({}, { each: true })
    @Type(() => Number)
    locationBbox: [number, number, number, number];

    @IsNumber()
    @IsOptional()
    completed: number;
}