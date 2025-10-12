import { Controller, Get, Query } from "@nestjs/common";
import { CitiesService } from "./cities.service";
import { GetCityDto, SearchCitiesDto, SearchCitiesResponseDto } from "./dto";
import { Public } from "@/decorators";
import { ResponseWithPaginationDto } from "@/dtos";
import { CitiesEntity } from "@/modules/cities/entities/cities.entity";

@Public()
@Controller("cities")
export class CitiesController {
    constructor(
        private readonly citiesService: CitiesService,
    ) {}

    @Get()
    getCity(
        @Query() params: GetCityDto,
    ): Promise<ResponseWithPaginationDto<CitiesEntity[]>> {
        return this.citiesService.getCity(params);
    }

    @Get("/search")
    searchCities(
        @Query() params: SearchCitiesDto,
    ): Promise<SearchCitiesResponseDto[]> {
        return this.citiesService.searchCities(params);
    }
}