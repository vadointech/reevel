import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray, IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";
import { Type } from "class-transformer";

export class UpdateEventDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    poster?: string;

    @IsString()
    @IsOptional()
    primaryColor?: string;

    @IsArray()
    @IsOptional()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({}, { each: true })
    @Type(() => Number)
    locationPoint?: [number, number];

    @IsString()
    @IsNotEmpty()
    locationTitle: string;

    @IsNumber()
    @IsOptional()
    ticketsAvailable?: number;

    @IsNumber()
    @IsOptional()
    ticketPrice?: number;

    @IsOptional()
    @IsDateString()
    dateTime?: Date;

    @IsArray()
    @IsOptional()
    interests?: string[];
}