import { DynamicModule, Module, Provider } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigService } from "@/config/config.service";
import { MapboxService } from "./mapbox.service";

import { MAPBOX_MODULE_CONFIG, MapboxModuleConfig } from "./mapbox.config";

@Module({})
export class MapboxModule {
    static forFeature(): DynamicModule {
        const providers: Provider[] = [
            {
                provide: MAPBOX_MODULE_CONFIG,
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => new MapboxModuleConfig(configService),
            },
            MapboxService,
        ];
        return {
            imports: [HttpModule],
            providers,
            exports: providers,
            module: MapboxModule,
        };
    }
}