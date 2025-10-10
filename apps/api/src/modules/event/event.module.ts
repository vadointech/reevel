import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { UploadsModule } from "@/modules/uploads/uploads.module";
import { EventRepository } from "./repositories/event.repository";
import { EventInterestsRepository } from "./repositories/event-interests.repository";
import { EventHostsRepository } from "./repositories/event-hosts.repository";
import { SubscriptionRegistry } from "@/modules/subscription/registry/subscription.registry";
import { EventTicketsRepository } from "@/modules/event/repositories/event-tickets.repository";
import { PaymentRepository } from "@/modules/payment/repositories/payment.repository";
import { BookingModule } from "@/modules/booking/booking.module";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { InterestsRepository } from "@/modules/interests/repositories/interests.repository";
import { InterestsRelationsRepository } from "@/modules/interests/repositories/interests-relations.repository";
import { EventCollectionController } from "@/modules/event/event-collection.controller";
import { EventCollectionService } from "@/modules/event/event-collection.service";

@Module({
    imports: [
        UploadsModule,
        BookingModule,
    ],
    controllers: [EventController, EventCollectionController],
    providers: [
        EventService,
        EventCollectionService,

        EventRepository,
        EventTicketsRepository,
        EventInterestsRepository,
        EventHostsRepository,
        PaymentRepository,

        UserRepository,
        InterestsRepository,
        InterestsRelationsRepository,

        SubscriptionRegistry,
    ],
})
export class EventModule {}
