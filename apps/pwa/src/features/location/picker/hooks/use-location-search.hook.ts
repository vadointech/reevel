import { useCallback, useEffect, useMemo, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IReactionDisposer, reaction } from "mobx";
import { useRouter } from "@/i18n/routing";

import { useLocationPicker } from "@/features/location/picker";
import { usePersistentMap } from "@/components/shared/map";

import { SearchLocationQueryBuilder } from "@/features/location/picker/queries";

import { placeLocationEntityMapper } from "@/entities/place/mapper";

import { RequestDebouncer } from "@/lib/debouncer";
import { IconPoint, Point } from "@/components/shared/map/types";

export function useLocationPickerSearch() {
    const queryClient = useQueryClient();
    const map = usePersistentMap();
    const router = useRouter();
    const { searchStore, confirmationStore, config } = useLocationPicker();

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

    const setSearchResults = (response?: SearchLocationQueryBuilder.TOutput) => {
        searchStore.setNextPageToken(response?.nextPageToken);

        if(response && response.places.length === 0) {
            searchStore.setSearchResults(null);
            return;
        }

        searchStore.setSearchResults(placeLocationEntityMapper.toIconPoint(response?.places));
    };

    const appendSearchResults = (response?: SearchLocationQueryBuilder.TOutput) => {
        searchStore.setNextPageToken(response?.nextPageToken);
        searchStore.appendSearchResults(placeLocationEntityMapper.toIconPoint(response?.places));
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


    const handleLocationPick = useCallback((point: Point<IconPoint>) => {
        confirmationStore.setPoint(point);
        router.push(config.callbackUrl + "/location");
    }, []);

    return {
        handleLoadMore,
        handleLocationPick,
        handleToggleLocationRestrictions,
    };
}