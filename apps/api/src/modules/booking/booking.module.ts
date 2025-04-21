import { Module } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { BookingController } from "./booking.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsEntity } from "@/modules/event/entities/events.entity";
import { PaymentModule } from "@/modules/payment/payment.module";
import { TicketsEntity } from "@/modules/booking/entities/tickets.entity";

@Module({
    imports: [
        PaymentModule,
        TypeOrmModule.forFeature([EventsEntity, TicketsEntity]),
    ],
    controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService],
})
export class BookingModule {}
