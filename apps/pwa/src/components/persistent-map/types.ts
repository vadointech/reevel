export type Point = {
    type: "Feature",
    properties: Record<string, any>,
    geometry: {
        type: "Point",
        coordinates: [number, number],
    },
};