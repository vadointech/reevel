import { ReactNode } from "react";

export type BasePoint = {
    id: string;
    image?: string;
    label?: string;
    primaryType?: string;
    icon?: {
        icon: ReactNode;
        primaryColor: string;
        secondaryColor: string;
    }
    [key: string]: string | number | undefined | Record<string, any>;
};

export type Point<
    P extends BasePoint,
> = {
    id: string;
    type: "Feature",
    properties: P,
    geometry: {
        type: "Point",
        coordinates: [number, number]
    },
};