import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { EventRepository } from "@/modules/event/repositories/event.repository";
import { TicketRepository } from "./repositories/ticket.repository";
import { PaymentRepository } from "@/modules/payment/repositories/payment.repository";

@Module({
    controllers: [BookingController],
    providers: [
        BookingService,

        TicketRepository,
        EventRepository,
        PaymentRepository,
    ],
})
export class BookingModule {}
