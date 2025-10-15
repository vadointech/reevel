import { Controller, Get } from "@nestjs/common";
import { Public } from "@/decorators";
import { InterestsSeedService } from "./services/interests.seed.service";
import { EventSeedService } from "@/modules/seed/services/event.seed.service";
import { CitiesSeedService } from "@/modules/seed/services/cities-seed.service";

@Public()
@Controller("seed")
export class SeedController {
    constructor(
        private readonly interestsSeedService: InterestsSeedService,
        private readonly eventSeedService: EventSeedService,
        private readonly citiesSeedService: CitiesSeedService,
    ) {}

    @Get("interests")
    async seedInterests() {
        await this.interestsSeedService.seedInterests();
        await this.interestsSeedService.seedRelations();

        return true;
    }

    @Get("events")
    async seedEvents() {
        await this.eventSeedService.seedEvents();
        return true;
    }

    @Get("cities")
    async seedCities() {
        await this.citiesSeedService.seedCities();
        return true;
    }
}
