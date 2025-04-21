import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { UploadsModule } from "@/modules/uploads/uploads.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsEntity } from "./entities/events.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([EventsEntity]),
        UploadsModule,
    ],
    controllers: [EventController],
    providers: [EventService],
    exports: [EventService],
})
export class EventModule {

}
