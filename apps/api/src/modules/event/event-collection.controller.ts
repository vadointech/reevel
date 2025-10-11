import {
    Body,
    Controller,
    Get, HttpCode, HttpStatus, Param,
    Post, Query,
} from "@nestjs/common";
import { Public, Session } from "@/decorators";
import { EventCollectionService } from "@/modules/event/event-collection.service";
import { GetNearbyEventsDto } from "@/modules/event/dto/get-nearby.dto";
import { ServerSession } from "@/types";

@Controller("events/collections")
export class EventCollectionController {
    constructor(
        private eventCollectionService: EventCollectionService,
    ) {}

    @Public()
    @Get("highlights")
    async getHighlights() {
        return this.eventCollectionService.getHighlightsCollection();
    }
    @Public()
    @Get("highlights/:cityId")
    async getCityHighlights(
        @Param("cityId") cityId: string,
    ) {
        return this.eventCollectionService.getCityHighlightsCollection(cityId);
    }
    @Public()
    @Get("highlights/:cityId/nearby")
    async getNearbyCityHighlights(
        @Param("cityId") cityId: string,
        @Query() params: GetNearbyEventsDto,
    ) {
        return this.eventCollectionService.getNearbyCityHighlightsCollection(cityId, params);
    }

    @Post("randomized")
    @HttpCode(HttpStatus.OK)
    async getRandomizedEvents(
        @Body() body: GetNearbyEventsDto,
    ) {
        return this.eventCollectionService.getRandomizedEvents(body);
    }

    @Get("interest/feed")
    async getEventInterestsCollections(
        @Session() session: ServerSession,
    ) {
        return this.eventCollectionService.getEventInterestCollectionsFeed(session);
    }
}