import { Controller, Get, Query } from "@nestjs/common";
import { CalendarService } from "./calendar.service";
import { GetUserCalendarParamsDto } from "@/modules/calendar/dto";
import { Session } from "@/decorators";
import { ServerSession } from "@/types";
import { ResponseWithPaginationDto } from "@/dtos";
import { EventsEntity } from "@/modules/event/entities/events.entity";

@Controller("calendar")
export class CalendarController {
    constructor(
        private readonly calendarService: CalendarService,
    ) {}

    @Get("me")
    getUserCalendar(
        @Query() params: GetUserCalendarParamsDto,
        @Session() session: ServerSession,
    ): Promise<ResponseWithPaginationDto<EventsEntity[]>> {
        return this.calendarService.getUserCalendar(session, params);
    }
}
