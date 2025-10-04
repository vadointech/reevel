import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";
import { EventsEntity } from "@/modules/event/entities/events.entity";
import { DeepPartial } from "typeorm";

export enum ParticipationType {
    HOSTING = "hosting",
    ATTENDING = "attending",
}

export class GetUserCalendarParamsDto {
    @IsOptional()
    @IsDateString()
    startDate?: Date;

    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @IsOptional()
    @IsEnum(ParticipationType)
    participationType?: ParticipationType;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number;
}

class GetUserCalendarResponsePaginationDto {
    currentPage: number = 1;
    totalPages: number = 0;
    totalItems: number = 0;
    limit: number = 10;
}
export class GetUserCalendarResponseDto {
    events: EventsEntity[] = [];
    pagination: Partial<GetUserCalendarResponsePaginationDto> = new GetUserCalendarResponsePaginationDto();

    constructor(input: Partial<GetUserCalendarResponseDto> = {}) {
        if(input.events) this.events = input.events;
        if(input.pagination) this.pagination = input.pagination;
    }
}