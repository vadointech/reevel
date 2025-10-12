import { Module } from "@nestjs/common";
import { CitiesService } from "./cities.service";
import { CitiesController } from "./cities.controller";
import { MapboxModule } from "@/infrastructure/mapbox";
import { CitiesRepository } from "@/modules/cities/repositories";

@Module({
    imports: [
        MapboxModule.forFeature(),
    ],
    controllers: [CitiesController],
    providers: [
        CitiesService,
        CitiesRepository,
    ],
})
export class CitiesModule {}
