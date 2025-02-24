import { Controller, Get, Param } from "@nestjs/common";
import { InterestsService } from "./interests.service";

@Controller("interests")
export class InterestsController {
    constructor(
        private readonly interestsService: InterestsService,
    ) {}

    @Get("initials")
    async getInitials() {
        return this.interestsService.getInitialInterests();
    }

    @Get("related/:slug")
    async getRelated(
        @Param("slug") slug: string,
    ) {
        return this.interestsService.getRelatedInterests(slug);
    }
}
