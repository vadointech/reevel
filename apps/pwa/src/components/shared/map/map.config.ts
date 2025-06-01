import { MapInternalConfig, MapProviderGL, MapConfig, MapProviderCameraState } from "./types";
import { LngLat, LngLatBounds } from "mapbox-gl";

export const MapProviderDefaultConfig: MapConfig.DefaultParams = {
    accessToken: "",
    mapStyleDark: "",
    mapStyleLight: "",
    viewState: {
        center: [0, 0],
        bboxPolygon: [[
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ]],
        zoom: 12,
        pitch: 0,
        padding: {
            top: 0,
            bottom: 260,
            left: 0,
            right: 0,
        },
    },
};

export class MapProviderInternalConfig implements MapInternalConfig.IInternalConfig {
    accessToken: MapInternalConfig.IInternalConfig["accessToken"];
    mapStyle: MapInternalConfig.IInternalConfig["mapStyle"];
    viewState: MapInternalConfig.IInternalConfig["viewState"];

    constructor(config: MapConfig.Params) {
        this.accessToken = config.accessToken;
        this.mapStyle = {
            styleLight: config.mapStyleLight,
            styleDark: config.mapStyleDark,
        };

        this.viewState = new MapboxProviderInternalViewState(config.viewState);
    }
}

export class MapboxProviderInternalViewState implements MapInternalConfig.IViewStateConfig {
    center: MapProviderGL.LngLat;
    bounds: MapProviderGL.LngLatBounds;
    zoom: number;
    pitch: number;
    padding: Partial<MapProviderCameraState.PaddingOptions>;

    constructor(config: Partial<MapConfig.ViewStateParams>) {
        const {
            center = MapProviderDefaultConfig.viewState.center,
            bboxPolygon = MapProviderDefaultConfig.viewState.bboxPolygon,
            zoom = MapProviderDefaultConfig.viewState.zoom,
            pitch = MapProviderDefaultConfig.viewState.pitch,
            padding = MapProviderDefaultConfig.viewState.padding,
        } = config;

        this.center = new LngLat(center[0], center[1]);

        this.bounds = this.polygonToBounds(bboxPolygon);

        this.zoom = zoom;
        this.pitch = pitch;
        this.padding = padding;
    }

    private polygonToBounds(polygon: MapProviderGL.LngLatPolygon): MapProviderGL.LngLatBounds {
        const [[lng1, lat1], , [lng2, lat2]] = polygon[0];

        return new LngLatBounds([lng1, lat1], [lng2, lat2]);
    }
}