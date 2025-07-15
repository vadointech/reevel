import { Controller, Get } from "@nestjs/common";
import { Public } from "@/decorators";
import { InterestsSeedService } from "./services/interests.seed.service";
import { EventSeedService } from "@/modules/seed/services/event.seed.service";

@Controller("seed")
export class SeedController {
    constructor(
        private readonly interestsSeedService: InterestsSeedService,
        private readonly eventSeedService: EventSeedService,
    ) {}

    @Public()
    @Get("interests")
    async seedInterests() {
        await this.interestsSeedService.seedInterests();
        await this.interestsSeedService.seedRelations();

        return true;
    }

    @Public()
    @Get("events")
    async seedEvents() {
        await this.eventSeedService.seedEvents();
        return true;
    }
}
