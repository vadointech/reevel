import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";


export class UpdateProfileLocationDto {
    @IsArray()
    @IsOptional()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({}, { each: true })
    @Type(() => Number)
    center: [number, number];

    @IsArray()
    @IsOptional()
    @ArrayMinSize(4)
    @ArrayMaxSize(4)
    @IsNumber({}, { each: true })
    @Type(() => Number)
    bbox: [number, number, number, number];
}

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

    @IsOptional()
    @Type(() => UpdateProfileLocationDto)
    location?: UpdateProfileLocationDto;

    @IsString()
    @IsOptional()
    completed: string;
}