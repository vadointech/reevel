import {
    Body,
    Controller,
    Get, HttpCode, HttpStatus,
    Post,
} from "@nestjs/common";
import { Session } from "@/decorators";
import { EventCollectionService } from "@/modules/event/event-collection.service";
import { GetNearbyEventsDto } from "@/modules/event/dto/get-nearby.dto";
import { ISessionUser, ServerSession } from "@/types";

@Controller("events/collections")
export class EventCollectionController {
    constructor(
        private eventCollectionService: EventCollectionService,
    ) {}

    @Get("highlights")
    async getCityHighlights(
        @Session() session: ServerSession<ISessionUser>,
    ) {
        return this.eventCollectionService.getEventCityHighlightsCollection(session);
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