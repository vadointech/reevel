"use client";

import { useOnboardingProgress, useOnboardingStore } from "@/features/onboarding";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MapboxFeatureResponse } from "@/api/mapbox/types";
import { mapboxFeatureResponseTransformer } from "@/features/mapbox";
import { ChangeEvent, useCallback } from "react";
import { useDebounce } from "@/lib/hooks";
import { useLocale } from "next-intl";
import { usePersistentMap } from "@/components/shared/map/map.context";
import { getPlaceByName } from "@/api/mapbox/get-place-by-name";

export function useLocationPicker(initialLocationList: MapboxFeatureResponse[]) {
    const onboardingStore = useOnboardingStore();
    const { handleNextStep } = useOnboardingProgress();
    const queryClient = useQueryClient();
    const { provider } = usePersistentMap();
    const locale = useLocale();

    const debounceSearchValue = useDebounce(onboardingStore.locationQuery);

    const { data: list } = useQuery({
        enabled: debounceSearchValue.length > 1,
        queryKey: ["user/city/search", debounceSearchValue],
        initialData: initialLocationList,
        queryFn: async() => {
            return getPlaceByName({
                body: {
                    name: debounceSearchValue,
                },
                params: {
                    access_token: provider?.accessToken,
                    language: locale,
                    types: "place",
                    limit: 4,
                },
            })
                .then(({ data }) => data?.features)
                .then(features => features?.map(mapboxFeatureResponseTransformer.toLocationList));
        },
    });

    const onSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        onboardingStore.setLocationQuery(e.target.value);
    };

    const pickerRef = useCallback((ref: HTMLDivElement | null) => {
        if (ref) {
            if(ref.childNodes.length === 0) return;

            const currentLocation = onboardingStore.location?.join(",") || "";
            if(!currentLocation) return;

            const containerHeight = ref.clientHeight;

            for (const [index, child] of ref.childNodes.entries()) {
                const childNode = child instanceof HTMLDivElement ? child : null;
                if(!childNode) continue;

                const scrollPosition = index * childNode.scrollHeight;

                const childLocation = childNode.dataset.location;
                if (childLocation && childLocation === currentLocation) {
                    if(scrollPosition >= containerHeight) {
                        requestAnimationFrame(() => {
                            ref.scrollTo({
                                top: scrollPosition,
                            });
                        });
                    }
                }
            }
        }
    }, [onboardingStore.location]);

    const handleSelectLocation = useCallback((feature: MapboxFeatureResponse) => {
        const location = feature.center;
        onboardingStore.setLocation(location[0], location[1]);
        queryClient.setQueryData<MapboxFeatureResponse>(["user/city", ...location], () => {
            return mapboxFeatureResponseTransformer.toConfirmationDrawer(feature);
        });
        handleNextStep();
    }, []);

    return {
        list,
        pickerRef,
        searchValue: onboardingStore.locationQuery,
        onSearchValueChange,
        handleSelectLocation,
    };
}