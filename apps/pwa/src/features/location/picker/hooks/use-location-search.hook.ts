import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useSearchLocation } from "@/infrastructure/google/hooks";
import { useLocationPicker } from "@/features/location/picker";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";
import { googlePlacesApiResponseTransformer } from "@/infrastructure/google/transformers";
import { useDebounce } from "@/lib/hooks";
import { usePersistentMap } from "@/components/shared/map";

export function useLocationPickerSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const { controller, searchStore } = useLocationPicker();
    const { searchPlacesByTextQuery } = useSearchLocation();

    const { provider } = usePersistentMap();

    const restrictions = useMemo(() => {
        const { bounds, center } = provider.current.internalConfig.viewState;

        if(bounds && center) {
            const radius = provider.current.getHorizontalRadius(bounds, center);
            return {
                center,
                radius,
            };
        }

        return undefined;
    }, [provider]);

    useEffect(() => {
        if(debouncedSearchTerm.length > 2) {
            searchPlacesByTextQuery(debouncedSearchTerm, restrictions)
                .then(googlePlacesApiResponseTransformer.formatAddress)
                .then(res => controller.current.cacheGooglePlacesApiResponse(res))
                .then(googlePlacesApiResponseMapper.toIconPoint)
                .then(points => searchStore.setSearchResults(points));
        } else {
            searchStore.setSearchResults([]);
        }
    }, [debouncedSearchTerm]);


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    return {
        searchTerm,
        handleSearch,
    };
}