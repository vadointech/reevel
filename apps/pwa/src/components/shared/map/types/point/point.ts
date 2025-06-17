
export type BasePoint = {
    id: string;
    label: string;
    [key: string]: string | number | undefined | Record<string, any>;
};

export type IconPoint = BasePoint & {
    iconType?: string;
    address?: string;
};

export type Point<
    P extends BasePoint,
> = {
    id: string;
    type: "Feature",
    properties: P,
    bbox?: [number, number, number, number],
    geometry: {
        type: "Point",
        coordinates: [number, number]
    },
};