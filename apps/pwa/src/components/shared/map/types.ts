export type BasePoint = {
    id: string;
    [key: string]: string | number | undefined;
};

export type Point<
    P extends BasePoint,
> = {
    type: "Feature",
    properties: P,
    geometry: {
        type: "Point",
        coordinates: [number, number]
    },
};