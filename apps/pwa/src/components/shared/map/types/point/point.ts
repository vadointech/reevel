
export type BasePoint = {
    id: string;
    label: string;
    [key: string]: string | number | undefined | Record<string, any>;
};

export type IconPoint = BasePoint & {
    iconType?: string;
    address?: string;
};
export type EventPoint = BasePoint & {
    imageUrl: string;
    primaryColor?: string;
};

export type PointGeometry = {
    type: "Point";
    coordinates: [number, number];
};

export type Point<
    P extends BasePoint,
> = {
    id: string;
    type: "Feature",
    properties: P,
    geometry: PointGeometry
};