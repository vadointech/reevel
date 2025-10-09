import { Controller, Get, Query } from "@nestjs/common";
import { CalendarService } from "./calendar.service";
import { GetUserCalendarParamsDto } from "@/modules/calendar/dto";
import { Session } from "@/decorators";
import { ServerSession } from "@/types";

@Controller("calendar")
export class CalendarController {
    constructor(
        private readonly calendarService: CalendarService,
    ) {}

    @Get("me")
    getUserCalendar(
        @Query() params: GetUserCalendarParamsDto,
        @Session() session: ServerSession,
    ) {
        return this.calendarService.getUserCalendar(session, params);
    }
}
