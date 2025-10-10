import { Injectable } from "@nestjs/common";
import { MapboxService } from "@/infrastructure/mapbox";
import { SearchCitiesDto, SearchCitiesResponseDto } from "./dto";
import { mapboxFeatureToSearchCitiesResponseDto } from "./mappers";

@Injectable()
export class CitiesService {
    constructor(
        private readonly mapboxService: MapboxService,
    ) {}

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
