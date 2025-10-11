import { Injectable, NotFoundException } from "@nestjs/common";
import { SpatialGrid } from "@repo/spatial-grid";
import geohash from "ngeohash";

import { EventRepository } from "@/modules/event/repositories";
import { EventsEntity, EventVisibility } from "@/modules/event/entities/events.entity";
import {
    EventPointResponseDto,
    GetCityHighlightsDto,
    GetNearbyEventsDto,
    GetRandomizedEventsDto,
} from "@/modules/discover/dto";
import { eventEntityToEventPointResponse } from "@/modules/discover/mappers/event-point-response.mapper";
import { ResponseWithPaginationDto } from "@/dtos";
import { CitiesRepository } from "@/modules/cities/repositories";
import { BoundingBox } from "@repo/geo";
import { endOfWeek } from "date-fns";

@Injectable()
export class DiscoverService {
    private readonly spatialGrid = new SpatialGrid();
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly citiesRepository: CitiesRepository,
    ) {}

    async getNearbyEvents(input: GetNearbyEventsDto): Promise<EventPointResponseDto[]> {
        const {
            tileId,
            zoom,
            interestId,
        } = input;

        const config = this.spatialGrid.getBreakpointForZoom(zoom);
        const neighborHashes = geohash.neighbors(tileId);
        const allHashes = [tileId, ...neighborHashes];

        const whereClauses = allHashes.map((hash) => {
            const bbox = geohash.decode_bbox(hash); // [minlat, minlon, maxlat, maxlon]
            return `ST_Intersects(event.locationPoint, ST_MakeEnvelope(${bbox[1]}, ${bbox[0]}, ${bbox[3]}, ${bbox[2]}, 4326))`;
        });

        const queryBuilder =
        this.eventRepository.queryBuilder("event")
            .select([
                "event.id",
                "event.title",
                "event.poster",
                "event.primaryColor",
                "event.visibility",
                "event.locationPoint",
            ])
            .where(`(${whereClauses.join(" OR ")})`)
            .andWhere("event.visibility = :visibility", { visibility: EventVisibility.PUBLIC })
            .andWhere("event.startDate > :now", { now: new Date() });

        if(interestId) {
            queryBuilder
                .innerJoin("event.interests", "interestLink")
                .andWhere("interestLink.interestId = :interest", { interest: interestId });
        }

        if(config.dataLimit) {
            queryBuilder.limit(config.dataLimit);
        }

        const events = await queryBuilder.getMany();

        return events.map(eventEntityToEventPointResponse);
    }

    async getRandomizedEvent(input: GetRandomizedEventsDto): Promise<EventsEntity[]> {
        const {
            cityId,
            interestId,
            limit = 10,
        } = input;

        const idsQueryBuilder = this.eventRepository.queryBuilder("event");

        if(interestId) {
            idsQueryBuilder.innerJoin("event.interests", "interestLink");
        }

        idsQueryBuilder.where("event.visibility = :visibility", { visibility: EventVisibility.PUBLIC });
        idsQueryBuilder.andWhere("event.startDate > :now", { now: new Date() });

        if(cityId) {
            const city = await this.citiesRepository.findOneBy({ id: cityId });
            if(!city) {
                throw new NotFoundException("City not found");
            }
            const bbox = BoundingBox.fromPolygon(city.bbox.coordinates);

            idsQueryBuilder.andWhere(`ST_Intersects(event.locationPoint, ST_MakeEnvelope(${bbox.sw.lng}, ${bbox.sw.lat}, ${bbox.ne.lng}, ${bbox.ne.lat}, 4326))`);
        }

        if(interestId) {
            idsQueryBuilder.andWhere("interestLink.interestId = :interest", { interest: interestId });
        }

        const randomEvents = await idsQueryBuilder
            .select("event.id")
            .orderBy("RANDOM()")
            .take(limit)
            .getRawMany();

        const eventIds = randomEvents.map(event => event.event_id);

        if(eventIds.length === 0) {
            return [];
        }

        const finalQueryBuilder = this.eventRepository.queryBuilder("event")
            .leftJoinAndSelect("event.hosts", "host")
            .leftJoinAndSelect("host.user", "hostUser")
            .leftJoinAndSelect("hostUser.profile", "userProfile")
            .leftJoinAndSelect("event.interests", "interestLink")
            .leftJoinAndSelect("interestLink.interest", "interestData")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.user", "ticketUser")
            .leftJoinAndSelect("ticketUser.profile", "ticketProfile")
            .where("event.id IN (:...eventIds)", { eventIds });

        const events = await finalQueryBuilder.getMany();

        return events.sort((a, b) => {
            return eventIds.indexOf(a.id) - eventIds.indexOf(b.id);
        });
    }

    async getCityHighlights(input: GetCityHighlightsDto): Promise<ResponseWithPaginationDto<EventsEntity[]>> {
        const {
            cityId,
            page = 1,
            limit = 10,
        } = input;

        const now = new Date();
        const skip = (page - 1) * limit;

        const queryBuilder = this.eventRepository.queryBuilder("event")
            .leftJoinAndSelect("event.hosts", "host")
            .leftJoinAndSelect("host.user", "hostUser")
            .leftJoinAndSelect("hostUser.profile", "userProfile")
            .leftJoinAndSelect("event.interests", "interestLink")
            .leftJoinAndSelect("interestLink.interest", "interestData")
            .leftJoinAndSelect("event.tickets", "ticket")
            .leftJoinAndSelect("ticket.user", "ticketUser")
            .leftJoinAndSelect("ticketUser.profile", "ticketProfile");

        if(cityId) {
            const city = await this.citiesRepository.findOneBy({ id: cityId });
            if(!city) {
                throw new NotFoundException();
            }

            const bbox = BoundingBox.fromPolygon(city.bbox.coordinates);
            queryBuilder.where(`ST_Intersects(event.locationPoint, ST_MakeEnvelope(${bbox.sw.lng}, ${bbox.sw.lat}, ${bbox.ne.lng}, ${bbox.ne.lat}, 4326))`);
        }

        queryBuilder
            .andWhere("event.startDate > :now")
            .andWhere("event.visibility = :visibility")
            // .orderBy("CASE WHEN event.isFeatured = true THEN 0 ELSE 1 END", "ASC")
            // .addOrderBy("CASE WHEN event.startDate BETWEEN :now AND :endOfWeek THEN 0 ELSE 1 END", "ASC")
            .addOrderBy("event.startDate", "ASC")
            .setParameters({
                now,
                visibility: EventVisibility.PUBLIC,
                endOfWeek: endOfWeek(now),
            })
            .skip(skip)
            .take(limit);

        const [events, total] = await queryBuilder.getManyAndCount();

        return new ResponseWithPaginationDto(events, {
            total,
            page,
            limit,
            lastPage: Math.ceil(total / limit),
        });
    }
}
