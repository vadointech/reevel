import { Controller, Param, Post } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { Session } from "@/decorators";
import { ServerSession } from "@/types";

@Controller("events/booking")
export class BookingController {
    constructor(
        private readonly bookingService: BookingService,
    ) {}

    @Post("reserve/:eventId")
    async bookTicket(
        @Param("eventId") eventId: string,
        @Session() session: ServerSession,
    ) {
        return this.bookingService.reserveTicket(session, eventId);
    }
}