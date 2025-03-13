export interface IMapProvider<Options = Record<string, any>> {
    accessToken: string;
    flyTo(coordinates: [number, number], options?: Options): void;
    fitBounds(bounds: [number, number, number, number], options?: Options): void;
}