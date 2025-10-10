class SearchCitiesLocationDto {
    latitude: number;
    longitude: number;
}

export class SearchCitiesResponseDto {
    id: string;
    location: SearchCitiesLocationDto;
    displayName: string;
    primaryType: string;
    primaryTypeDisplayName: string;
    formattedAddress: string;
    googleMapsUri: string;
    bbox: number[];

    constructor(input: SearchCitiesResponseDto) {
        Object.assign(this, input);
    }
}