import { Controller, Get, Param, Query } from "@nestjs/common";
import { InterestsService } from "./interests.service";
import { InterestsFilterParamsDto } from "./dto/interests-filter-params.dto";
import { Public } from "@/decorators";

@Public()
@Controller("interests")
export class InterestsController {
    constructor(
        private readonly interestsService: InterestsService,
    ) {}

    @Get()
    async getInterestsByParams(
        @Query() params: InterestsFilterParamsDto,
    ) {
        return this.interestsService.getInterestsByParams(params);
    }

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

    @Get(":id")
    async getInterestById(
        @Param("id") id: string,
    ) {
        return this.interestsService.getInterestById(id);
    }
}
