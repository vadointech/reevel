import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { UploadsModule } from "@/modules/uploads/uploads.module";
import { EventRepository } from "./repositories/event.repository";
import { EventInterestsRepository } from "./repositories/event-interests.repository";
import { EventHostsRepository } from "./repositories/event-hosts.repository";
import { SubscriptionRegistry } from "@/modules/subscription/registry/subscription.registry";
import { TicketRepository } from "@/modules/booking/repositories/ticket.repository";
import { BookingService } from "@/modules/booking/booking.service";
import { PaymentRepository } from "@/modules/payment/repositories/payment.repository";

@Module({
    imports: [
        UploadsModule,
    ],
    controllers: [EventController],
    providers: [
        EventService,
        BookingService,

        EventRepository,
        TicketRepository,
        EventInterestsRepository,
        EventHostsRepository,
        PaymentRepository,

        SubscriptionRegistry,
    ],
})
export class EventModule {}
