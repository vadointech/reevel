import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entities/Event.entity";
import { Comment } from "./entities/comment.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Event, Comment])],
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule {

}
