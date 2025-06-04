import { MapProviderGL } from "./gl";
import { MapProviderCameraState } from "@/components/shared/map/types";

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

export namespace MapConfig {
    export interface ViewStateParams extends Omit<MapInternalConfig.IViewStateConfig, "bounds" | "center"> {
        center: [number, number];
        bboxPolygon: MapProviderGL.LngLatPolygon;
    }

    export interface DefaultParams extends Omit<Params, "viewState"> {
        viewState: ViewStateParams;
    }

    export type Params = {
        accessToken: string;
        mapStyleDark: string;
        mapStyleLight: string;
        viewState: Partial<ViewStateParams>;
    };
}