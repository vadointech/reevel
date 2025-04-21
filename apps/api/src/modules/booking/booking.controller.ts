import { Controller, Get, Param } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { Session } from "@/decorators";
import { ServerSession } from "@/modules/auth/dto/jwt.dto";

@Controller("events/booking")
export class BookingController {
    constructor(
        private readonly bookingService: BookingService,
    ) {}

    @Get(":eventId")
    async bookTicket(
        @Param("eventId") eventId: string,
        @Session() session: ServerSession,
    ) {
        return this.bookingService.bookTicket(session.user.id, eventId);
    }
}
