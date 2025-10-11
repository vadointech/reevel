import { Controller, Get, Query } from "@nestjs/common";
import { Public, Session } from "@/decorators";
import { ResponseWithPaginationDto } from "@/dtos";
import { ServerSession } from "@/types";
import { DiscoverService } from "./discover.service";
import {
    GetEventsDto,
    EventPointResponseDto,
    GetCityHighlightsDto,
    GetNearbyEventsDto,
} from "@/modules/discover/dto";
import { EventsEntity } from "@/modules/event/entities/events.entity";
import { InterestsEntity } from "@/modules/interests/entities/interests.entity";

@Public()
@Controller("discover")
export class DiscoverController {
    constructor(
        private readonly discoverService: DiscoverService,
    ) {}

    @Get("events")
    getEvents(
        @Query() params: GetEventsDto,
    ): Promise<ResponseWithPaginationDto<EventsEntity[]>> {
        return this.discoverService.getEvents(params);
    }

    @Get("events/nearby")
    getNearbyEvents(
        @Query() params: GetNearbyEventsDto,
    ): Promise<EventPointResponseDto[]> {
        return this.discoverService.getNearbyEvents(params);
    }

    @Get("events/randomized")
    getRandomizedEvents(
        @Query() params: GetEventsDto,
    ): Promise<EventsEntity[]> {
        return this.discoverService.getRandomizedEvent(params);
    }

    @Get("highlights")
    getHighlights(
        @Query() params: GetCityHighlightsDto,
    ): Promise<ResponseWithPaginationDto<EventsEntity[]>> {
        return this.discoverService.getCityHighlights(params);
    }

    @Get("interests")
    getInterestsFeed(
        @Session() session: ServerSession,
    ): Promise<InterestsEntity[]> {
        return this.discoverService.getInterestsFeed(session);
    }
}
