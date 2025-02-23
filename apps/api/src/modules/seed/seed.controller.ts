import { Controller, Get } from "@nestjs/common";
import { Public } from "@/decorators";
import { InterestsSeedService } from "./services/interests.seed.service";

@Controller("seed")
export class SeedController {
    constructor(
        private readonly interestsSeedService: InterestsSeedService,
    ) {}

    @Public()
    @Get("interests")
    async seedInterests() {
        await this.interestsSeedService.seedInterests();
        await this.interestsSeedService.seedRelations();

        return true;
    }
}
