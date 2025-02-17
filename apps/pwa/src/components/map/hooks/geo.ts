type GeoJSON = {
    type: "FeatureCollection",
    features: FeatureCollection[]
};

type FeatureCollection = {
    type: "Feature",
    geometry: {
        type: "Point",
        coordinates: [number, number],
    },
    properties: {},
};


export const data: GeoJSON = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [28.42009526821738,49.21978684570328],
            },
            properties: {
                flagColor: "yellow",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [28.412681187828355, 49.226090388753505],
            },
            properties: {
                flagColor: "yellow",
            },
        },
        {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [28.41130235675783, 49.22621694011241],
            },
            properties: {
                flagColor: "yellow",
            },
        },
    ],
};