import { EventParticipationType, EventsEntity } from "@/modules/event/entities/events.entity";

export class GetUserCalendarResponsePaginationDto {
    currentPage: number = 1;
    totalPages: number = 0;
    totalItems: number = 0;
    limit: number = 10;
}
export class GetUserCalendarResponseEventsDto extends EventsEntity {
    participationType: EventParticipationType | null;
}

export class GetUserCalendarResponseDto {
    events: GetUserCalendarResponseEventsDto[] = [];
    pagination: Partial<GetUserCalendarResponsePaginationDto> = new GetUserCalendarResponsePaginationDto();

    constructor(input: Partial<GetUserCalendarResponseDto> = {}) {
        if(input.events) this.events = input.events;
        if(input.pagination) this.pagination = input.pagination;
    }
}