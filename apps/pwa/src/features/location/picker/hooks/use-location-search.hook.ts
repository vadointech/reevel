import { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocationPicker } from "@/features/location/picker";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";
import { usePersistentMap } from "@/components/shared/map";
import { useQueryClient } from "@tanstack/react-query";
import { SearchLocationQueryBuilder } from "@/features/location/picker/queries";
import { IReactionDisposer, reaction } from "mobx";
import { RequestDebouncer } from "@/lib/debouncer";
import { GooglePlacesApiResponse } from "@/api/google/places/types";

export function useLocationPickerSearch() {
    const queryClient = useQueryClient();
    const map = usePersistentMap();
    const { searchStore } = useLocationPicker();

    const debouncer = useRef(new RequestDebouncer());

    const locationRestrictionsValue: SearchLocationQueryBuilder.TInput["locationRestrictions"] = useMemo(() => {
        return SearchLocationQueryBuilder.getLocationRestrictions(map.provider.current.internalConfig.viewState.bounds);
    }, []);

    const locationRestrictions = useRef<
      SearchLocationQueryBuilder.TInput["locationRestrictions"] | undefined
    >(locationRestrictionsValue);

    const handleFetchData = useCallback((input: SearchLocationQueryBuilder.TInput) => {
        return debouncer.current.debounceRequest(async() => {
            if (input.query.length > 2) {
                return queryClient.fetchQuery(SearchLocationQueryBuilder(input));
            } else {
                return undefined;
            }
        }, 700);
    }, [queryClient]);

    const setSearchResults = (response?: GooglePlacesApiResponse) => {
        searchStore.setNextPageToken(response?.nextPageToken);

        if(response && response.places.length === 0) {
            searchStore.setSearchResults(null);
            return;
        }

        searchStore.setSearchResults(googlePlacesApiResponseMapper.toIconPoint(response));
    };

    const appendSearchResults = (response?: GooglePlacesApiResponse) => {
        searchStore.setNextPageToken(response?.nextPageToken);
        searchStore.appendSearchResults(googlePlacesApiResponseMapper.toIconPoint(response));
    };

    useEffect(() => {
        const disposers: IReactionDisposer[] = [];

        disposers.push(
            reaction(
                () => searchStore.searchQuery,
                (query) => handleFetchData({
                    query,
                    locationRestrictions: locationRestrictions.current,
                }).then(setSearchResults),
            ),
        );

        return () => {
            disposers.forEach(dispose => dispose());
        };
    }, []);

    const handleToggleLocationRestrictions = useCallback(() => {
        if(searchStore.locationRestrictions) {
            locationRestrictions.current = undefined;
            searchStore.setLocationRestrictions(false);
            handleFetchData({
                query: searchStore.searchQuery,
            }).then(setSearchResults);
        } else {
            locationRestrictions.current = locationRestrictionsValue;
            searchStore.setLocationRestrictions(true);
            handleFetchData({
                query: searchStore.searchQuery,
                locationRestrictions: locationRestrictions.current,
            }).then(setSearchResults);
        }
    }, []);

    const handleLoadMore = useCallback(() => {
        if(searchStore.nextPageToken) {
            handleFetchData({
                query: searchStore.searchQuery,
                locationRestrictions: locationRestrictions.current,
                nextPageToken: searchStore.nextPageToken,
            }).then(appendSearchResults);
        }
    }, []);

    return {
        handleLoadMore,
        handleToggleLocationRestrictions,
    };
}