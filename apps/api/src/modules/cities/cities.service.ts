import { Injectable, NotFoundException } from "@nestjs/common";
import { MapboxService } from "@/infrastructure/mapbox";
import { GetCityDto, SearchCitiesDto, SearchCitiesResponseDto } from "./dto";
import { mapboxFeatureToSearchCitiesResponseDto } from "./mappers";
import { CitiesRepository } from "@/modules/cities/repositories";
import { ResponseWithPaginationDto } from "@/dtos";
import { CitiesEntity } from "@/modules/cities/entities/cities.entity";

@Injectable()
export class CitiesService {
    constructor(
        private readonly mapboxService: MapboxService,
        private readonly citiesRepository: CitiesRepository,
    ) {}


    async getCity(input: GetCityDto): Promise<ResponseWithPaginationDto<CitiesEntity[]>> {
        const {
            mapboxId,
            page = 1,
            limit = 10,
        } = input;

        console.log(mapboxId);

        if(mapboxId) {
            const city = await this.citiesRepository.findOneBy({ mapboxId });
            if(!city) {
                return new ResponseWithPaginationDto([], { page, limit, total: 0 });
            }
            return new ResponseWithPaginationDto([city], { page, limit, total: 1 });
        }

        const skip = (page - 1) * limit;

        const [cities, total] = await this.citiesRepository.queryBuilder("city")
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        return new ResponseWithPaginationDto(cities, { page, limit, total });
    }

    async searchCities(input: SearchCitiesDto): Promise<SearchCitiesResponseDto[]> {
        const {
            q,
            lng,
            lat,
            limit,
        } = input;

        if(q) {
            const features = await this.mapboxService.geocodeForward(q, { limit });
            return features.features.map(mapboxFeatureToSearchCitiesResponseDto);
        }

        if(lng && lat) {
            const features = await this.mapboxService.geocodeReverse({ lng, lat }, { limit });
            return features.features.map(mapboxFeatureToSearchCitiesResponseDto);
        }

        return [];
    }
}
