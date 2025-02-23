import { Controller, Get, Param } from "@nestjs/common";
import { InterestsService } from "./interests.service";
import { Public } from "@/decorators";

@Controller("interests")
export class InterestsController {
    constructor(
        private readonly interestsService: InterestsService,
    ) {}

    @Public()
    @Get("seed")
    async seed() {
        // return this.interestsService.seedInterests();
        return this.interestsService.seedRelations();
    }

    @Public()
    @Get(":slug")
    async get(@Param("slug") slug: string) {
        return this.interestsService.getRelated(slug);
    }
}
