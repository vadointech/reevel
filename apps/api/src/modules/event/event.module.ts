import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { UploadsModule } from "@/modules/uploads/uploads.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsEntity } from "./entities/events.entity";
import { TicketsEntity } from "@/modules/booking/entities/tickets.entity";
import { BookingModule } from "@/modules/booking/booking.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([EventsEntity, TicketsEntity]),
        UploadsModule,
        BookingModule,
    ],
    controllers: [EventController],
    providers: [EventService],
    exports: [EventService],
})
export class EventModule {}
