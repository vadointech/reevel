import { Module } from "@nestjs/common";
import { CalendarService } from "./calendar.service";
import { CalendarController } from "./calendar.controller";
import { EventRepository } from "@/modules/event/repositories/event.repository";

@Module({
    controllers: [CalendarController],
    providers: [
        CalendarService,

        EventRepository,
    ],
})
export class CalendarModule {}
