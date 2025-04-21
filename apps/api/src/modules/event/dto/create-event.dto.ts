import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { EventVisibility } from "@/modules/event/entities/events.entity";

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    poster: string;

    @IsString()
    @IsOptional()
    primaryColor?: string;

    @IsArray()
    @IsOptional()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({}, { each: true })
    @Type(() => Number)
    location?: [number, number];

    @IsNumber()
    @IsOptional()
    ticketsAvailable?: number;

    @IsNumber()
    @IsOptional()
    ticketPrice?: number;

    @IsEnum(EventVisibility)
    @IsOptional()
    visibility?: EventVisibility;

    @IsNotEmpty()
    @IsDateString()
    dateTime: Date;

    @IsArray()
    @IsOptional()
    interests?: string[];
}