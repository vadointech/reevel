import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { EventRepository } from "@/modules/event/repositories/event.repository";
import { EventTicketsRepository } from "../event/repositories/event-tickets.repository";
import { PaymentModule } from "@/modules/payment/payment.module";
import { PaymentRepository } from "@/modules/payment/repositories/payment.repository";

@Module({
    imports: [
        PaymentModule,
    ],
    controllers: [BookingController],
    providers: [
        BookingService,

        EventTicketsRepository,
        EventRepository,
        PaymentRepository,
    ],

    exports: [BookingService],
})
export class BookingModule {}
