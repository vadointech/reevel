import {
    Body,
    Controller,
    Get, HttpCode, HttpStatus,
    Post,
} from "@nestjs/common";
import { Session } from "@/decorators";
import { EventCollectionService } from "@/modules/event/event-collection.service";
import { GetNearbyEventsDto } from "@/modules/event/dto/get-nearby.dto";
import { ServerSession } from "@/types";

@Controller("events/collections")
export class EventCollectionController {
    constructor(
        private eventCollectionService: EventCollectionService,
    ) {}

    @Post("highlights")
    @HttpCode(HttpStatus.OK)
    async getCityHighlights(
        @Body() body: GetNearbyEventsDto,
    ) {
        return this.eventCollectionService.getEventCityHighlightsCollection(body);
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