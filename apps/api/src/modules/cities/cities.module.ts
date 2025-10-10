import { Module } from "@nestjs/common";
import { CitiesService } from "./cities.service";
import { CitiesController } from "./cities.controller";
import { MapboxModule } from "@/infrastructure/mapbox";

@Module({
    imports: [
        MapboxModule.forFeature(),
    ],
    controllers: [CitiesController],
    providers: [CitiesService],
})
export class CitiesModule {}
