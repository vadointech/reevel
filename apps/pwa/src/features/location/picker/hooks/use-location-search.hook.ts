import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchLocation } from "@/infrastructure/google/hooks";
import { useLocationPicker } from "@/features/location/picker";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";
import { googlePlacesApiResponseTransformer } from "@/infrastructure/google/transformers";
import { useDebounce } from "use-debounce";
import { usePersistentMap } from "@/components/shared/map";
import { MapProviderGL } from "@/components/shared/map/types";

export function useLocationPickerSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

    const { searchStore } = useLocationPicker();
    const { provider } = usePersistentMap();

    const { searchPlacesByTextQuery } = useSearchLocation();

    const fetchPlaces = useCallback((
        query: string,
        restrictions?: {
            center: MapProviderGL.LngLat,
            radius: number,
        },
    ) => {
        searchPlacesByTextQuery(query, restrictions)
            .then(googlePlacesApiResponseTransformer.formatAddress)
            .then(googlePlacesApiResponseMapper.toIconPoint)
            .then(points => searchStore.setSearchResults(points));
    }, []);

    const locationRestrictions = useMemo(() => {
        if(searchStore.locationRestrictions) {
            const { bounds, center } = provider.current.internalConfig.viewState;

            if(bounds && center) {
                const radius = provider.current.getHorizontalRadius(bounds, center);
                return {
                    center,
                    radius,
                };
            }
        }
    }, [searchStore.locationRestrictions]);

    useEffect(() => {
        if(debouncedSearchQuery.length > 2) {
            fetchPlaces(debouncedSearchQuery, locationRestrictions);
        } else {
            searchStore.setSearchResults([]);
        }
    }, [debouncedSearchQuery, searchStore.locationRestrictions]);

    const handleSetSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return {
        searchQuery,
        handleSetSearchQuery,
    };
}