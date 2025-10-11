import { Controller, Get, Query } from "@nestjs/common";
import { Public } from "@/decorators";
import { ResponseWithPaginationDto } from "@/dtos";
import { DiscoverService } from "./discover.service";
import {
    EventPointResponseDto,
    GetCityHighlightsDto,
    GetNearbyEventsDto,
    GetRandomizedEventsDto,
} from "@/modules/discover/dto";
import { EventsEntity } from "@/modules/event/entities/events.entity";

@Public()
@Controller("discover")
export class DiscoverController {
    constructor(
        private readonly discoverService: DiscoverService,
    ) {}

    @Get("events/nearby")
    getNearbyEvents(
        @Query() params: GetNearbyEventsDto,
    ): Promise<EventPointResponseDto[]> {
        return this.discoverService.getNearbyEvents(params);
    }

    @Get("events/randomized")
    getRandomizedEvents(
        @Query() params: GetRandomizedEventsDto,
    ): Promise<EventsEntity[]> {
        return this.discoverService.getRandomizedEvent(params);
    }

    @Get("highlights")
    getHighlights(
        @Query() params: GetCityHighlightsDto,
    ): Promise<ResponseWithPaginationDto<EventsEntity[]>> {
        return this.discoverService.getCityHighlights(params);
    }
}
