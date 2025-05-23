import { LngLatLike } from "mapbox-gl";

export namespace MapProviderCameraState {
    export type Viewport = {
        /** Longitude at map center */
        longitude: number;
        /** Latitude at map center */
        latitude: number;
        /** Map zoom level */
        zoom: number;
        /** Map rotation bearing in degrees counter-clockwise from north */
        bearing: number;
        /** Map angle in degrees at which the camera is looking at the ground */
        pitch: number;
        /** Dimensions in pixels applied on each side of the viewport for shifting the vanishing point. */
        padding: Partial<PaddingOptions>;
    };

    export type PaddingOptions = {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };

    export type AnimationOptions = {
        animate: boolean;
        curve: number;
        duration: number;
        easing: (_: number) => number;
        essential: boolean;
        linear: boolean;
        maxDuration: number;
        preloadOnly: boolean;
        screenSpeed: number;
        speed: number;
    };

    export type CameraOptions = {
        center: LngLatLike;
        zoom: number;
        bearing: number;
        pitch: number;
        padding: number | PaddingOptions;
        minZoom: number;
        maxZoom: number;
        retainPadding: boolean;
    };

    export type EasingOptions = Partial<CameraOptions> & Partial<AnimationOptions>;

    export type Bounds = [number, number, number, number];
}