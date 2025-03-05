import { Controller, Get, Param } from "@nestjs/common";
import { InterestsService } from "./interests.service";
import { Session } from "@/decorators";
import { ServerSession } from "@/modules/auth/dto/jwt.dto";

@Controller("interests")
export class InterestsController {
    constructor(
        private readonly interestsService: InterestsService,
    ) {}

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
