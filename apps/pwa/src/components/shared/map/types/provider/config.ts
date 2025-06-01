import { MapProviderGL } from "./gl";
import { MapProviderCameraState } from "@/components/shared/map/types";

export namespace MapConfig {
    export type ViewStateParams = {
        center: number[];
        bboxPolygon: MapProviderGL.LngLatPolygon;
        zoom: number;
        pitch: number;
        padding: Partial<MapProviderCameraState.PaddingOptions>
    };

    export type Params = {
        accessToken: string;
        mapStyleDark: string;
        mapStyleLight: string;
        viewState: Partial<ViewStateParams>;
    };

    export type DefaultParams = {
        accessToken: string;
        mapStyleDark: string;
        mapStyleLight: string;
        viewState: ViewStateParams;
    };
}

export namespace MapInternalConfig {
    export interface IViewStateConfig {
        center: MapProviderGL.LngLat;
        bounds: MapProviderGL.LngLatBounds;

        zoom: number;
        pitch: number;
        padding: Partial<MapProviderCameraState.PaddingOptions>
    }


    export interface IInternalConfig {
        accessToken: string;
        mapStyle: {
            styleDark: string;
            styleLight: string;
        };
        viewState: IViewStateConfig;
    }
}