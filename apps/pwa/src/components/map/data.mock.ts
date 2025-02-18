import Supercluster from "supercluster";

export const mockGeoJsonData: Supercluster.PointFeature<any>[] = [
    {
        type: "Feature",
        properties: {
            id: "1",
        },
        geometry: {
            type: "Point",
            coordinates: [
                28.42009526821738,
                49.21978684570328,
            ],
        },
    },
    {
        type: "Feature",
        properties: {
            id: "2",
        },
        geometry: {
            type: "Point",
            coordinates: [
                28.412681187828355,
                49.226090388753505,
            ],
        },
    },
    {
        type: "Feature",
        properties: {
            id: "3",
        },
        geometry: {
            type: "Point",
            coordinates: [
                28.41130235675783,
                49.22621694011241,
            ],
        },
    },
];