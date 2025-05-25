import { ChangeEvent } from "react";
import { useSearchLocation } from "@/features/google/hooks";
import { useLocationPicker } from "@/features/location/picker";
import { googlePlacesApiResponseMapper } from "@/features/google/mappers";

export function useLocationPickerSearch() {
    const { searchStore } = useLocationPicker();
    const { searchPlacesByTextQuery } = useSearchLocation();

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        searchStore.setSearchTerm(value);

        if(value.length > 2) {
            searchPlacesByTextQuery(e.target.value)
                .then(googlePlacesApiResponseMapper.toBasePoint)
                .then(points => searchStore.setSearchResults(points));
        }

    };

    return { handleSearch };
}