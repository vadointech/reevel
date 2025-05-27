import { Controller, Get, Param, Query } from "@nestjs/common";
import { InterestsService } from "./interests.service";
import { Session } from "@/decorators";
import { ServerSession } from "@/modules/auth/dto/jwt.dto";
import { InterestsFilterParamsDto } from "./dto/interests-filter-params.dto";

@Controller("interests")
export class InterestsController {
    constructor(
        private readonly interestsService: InterestsService,
    ) { }

    @Get()
    async getInterestsByParams(
        @Query() params: InterestsFilterParamsDto,
    ) {
        return this.interestsService.getInterestsByParams(params);
    }

    @Get("initials")
    async getInitials(
        @Session() session: ServerSession,
    ) {
        return this.interestsService.getInitialInterests(session.user.id);
    }

    @Get("related/:slug")
    async getRelated(
        @Param("slug") slug: string,
    ) {
        return this.interestsService.getRelatedInterests(slug);
    }
}
