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
import { SupportedCurrencies } from "@/modules/payment/entities/payment.entity";

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
    @IsNotEmpty()
    posterFieldId: string;

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

    @IsString()
    @IsOptional()
    @Type(() => Number)
    ticketsAvailable?: number;

    @IsString()
    @IsOptional()
    @Type(() => Number)
    ticketPrice?: number;

    @IsEnum(SupportedCurrencies)
    @IsOptional()
    ticketPriceCurrency?: SupportedCurrencies;

    @IsEnum(EventVisibility)
    @IsOptional()
    visibility?: EventVisibility;

    @IsNotEmpty()
    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @IsArray()
    @IsOptional()
    interests?: string[];
}