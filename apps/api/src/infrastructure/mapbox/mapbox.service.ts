import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { ILngLat } from "@repo/geo";
import { MAPBOX_MODULE_CONFIG, MapboxModuleConfig } from "./mapbox.config";
import { MapboxRequestParamsDto, MapboxResponseDto } from "./dto";

@Injectable()
export class MapboxService {
    private readonly logger = new Logger(MapboxService.name);
    private readonly geocodeUrl = `${this.internalConfig.baseUrl}/search/geocode/v6`;

    constructor(
        @Inject(MAPBOX_MODULE_CONFIG)
        private readonly internalConfig: MapboxModuleConfig,
        private readonly httpService: HttpService,
    ) {}

    async geocodeForward(q: string, p: Partial<MapboxRequestParamsDto> = {}) {
        const params = new URLSearchParams({
            q,
            access_token: this.internalConfig.accessToken,
            country: "ua",
            language: "uk",
            types: "place",
            ...this.marshalRequestParams(p),
        });


        const url = `${this.geocodeUrl}/forward?${params.toString()}`;

        try {
            const response = await firstValueFrom(this.httpService.get<MapboxResponseDto>(url));
            return response.data;
        } catch (error) {
            this.handleError(error, "Geocode Forward");
        }
    }

    async geocodeReverse({ lng, lat }: ILngLat, p: Partial<MapboxRequestParamsDto> = {}) {
        const params = new URLSearchParams({
            longitude: lng.toString(),
            latitude: lat.toString(),
            access_token: this.internalConfig.accessToken,
            language: "uk",
            types: "place",
            ...this.marshalRequestParams(p),
        });

        const url = `${this.geocodeUrl}/reverse?${params.toString()}`;

        try {
            const response = await firstValueFrom(this.httpService.get<MapboxResponseDto>(url));
            return response.data;
        } catch (error) {
            this.handleError(error, "Geocode Reverse");
        }
    }

    private handleError(error: unknown, context: string): never {
        if (error instanceof AxiosError) {
            this.logger.error(
                `Mapbox API Error in ${context}: ${error.response?.status} ${error.response?.data?.message}`,
                error.stack,
            );
        } else {
            this.logger.error(`An unknown error occurred in ${context}`, error);
        }

        throw new InternalServerErrorException("Failed to communicate with Mapbox API");
    }

    private marshalRequestParams(params: Partial<MapboxRequestParamsDto>) {
        for(const [key, value] of Object.entries(params)) {
            if(typeof value !== "undefined") {
                params[key] = value.toString();
            }
        }

        return params as Record<string, string>;
    }
}