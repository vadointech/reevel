import data from "../data/cities.json";
import { Injectable } from "@nestjs/common";
import { CitiesRepository } from "@/modules/cities/repositories";

@Injectable()
export class CitiesSeedService {
    constructor(
        private readonly citiesRepository: CitiesRepository,
    ) {}

    async seedCities() {
        return this.citiesRepository.createAndSaveMany(
            data.map(city => ({
                name: city.name,
                mapboxId: city.mapboxId,
                center: {
                    type: "Point",
                    coordinates: city.center.coordinates,
                },
                bbox: {
                    type: "Polygon",
                    coordinates: city.bbox.coordinates,
                },
            })),
        );
    }
}