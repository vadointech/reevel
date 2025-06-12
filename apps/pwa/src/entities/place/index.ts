export type PlaceLocationEntity = {
    id: string;
    location: {
        latitude: number,
        longitude: number,
    }
    displayName: string;
    primaryType: string;
    primaryTypeDisplayName: string;
    formattedAddress: string;
    googleMapsUri: string;
    bbox?: [number, number, number, number]
};
