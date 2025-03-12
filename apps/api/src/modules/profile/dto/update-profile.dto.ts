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
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({}, { each: true })
    @Type(() => Number)
    location?: [number, number];

    @IsArray()
    @IsOptional()
    interests?: string[];

    @IsString()
    @IsOptional()
    completed: string;
}