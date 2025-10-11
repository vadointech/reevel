import { Module } from "@nestjs/common";
import { DiscoverService } from "./discover.service";
import { DiscoverController } from "./discover.controller";
import { EventRepository } from "@/modules/event/repositories";
import { CitiesRepository } from "@/modules/cities/repositories";

@Module({
    controllers: [DiscoverController],
    providers: [
        DiscoverService,
        EventRepository,
        CitiesRepository,
    ],
})
export class DiscoverModule {}
