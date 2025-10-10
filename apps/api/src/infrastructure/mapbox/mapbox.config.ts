import { IMapboxModuleConfig } from "@/infrastructure/mapbox/types";
import { ConfigService } from "@/config/config.service";

export const MAPBOX_MODULE_CONFIG = "MAPBOX_MODULE_CONFIG";

export class MapboxModuleConfig implements IMapboxModuleConfig {
    accessToken: string;
    baseUrl: string = "https://api.mapbox.com";

    constructor(configService: ConfigService) {
        this.accessToken = configService.env("MAPBOX_ACCESS_TOKEN");
    }
}