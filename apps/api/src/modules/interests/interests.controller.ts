import { Controller, Get, Param, Query } from "@nestjs/common";
import { InterestsService } from "./interests.service";
import { Public, Session } from "@/decorators";
import { ServerSession } from "@/modules/auth/dto/jwt.dto";
@Controller("interests")
export class InterestsController {
    constructor(
        private readonly interestsService: InterestsService,
    ) { }

    @Get()
    async getAllInterests() {
        return this.interestsService.getAllInterests();
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

    @Public()
    @Get("search")
    async getSearch(
        @Query("s") search?: string,
    ) {

        console.log("Search param:", search);
        const builder = await this.interestsService.queryBuilder("interests");

        if (search) {
            builder.where(
                "LOWER(interests.title_uk) LIKE LOWER(:search) OR LOWER(interests.title_en) LIKE LOWER(:search)",
                { search: `%${search}%` },
            );
        }

        builder.take(50);

        return await builder.getMany();
    }
}
