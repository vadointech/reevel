import { Controller, Get, Query } from "@nestjs/common";
import { CitiesService } from "./cities.service";
import { SearchCitiesDto, SearchCitiesResponseDto } from "./dto";
import { Public } from "@/decorators";

@Controller("cities")
export class CitiesController {
    constructor(
        private readonly citiesService: CitiesService,
    ) {}

    @Public()
    @Get("/search")
    searchCities(
        @Query() params: SearchCitiesDto,
    ): Promise<SearchCitiesResponseDto[]> {
        return this.citiesService.searchCities(params);
    }
}