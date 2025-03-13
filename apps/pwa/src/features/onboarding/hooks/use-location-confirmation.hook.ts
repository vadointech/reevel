"use client";

import { useEffect } from "react";
import { useOnboardingProgress, useOnboardingStore } from "@/features/onboarding";
import { useQuery } from "@tanstack/react-query";
import { getPlaceByCoordinates } from "@/api/mapbox/get-place-by-coordinates";
import { usePersistentMap } from "@/components/shared/map/map.context";
import { MapStore, IMapProvider } from "@/components/shared/map";
import { mapboxFeatureResponseTransformer } from "@/features/mapbox";
import { useLocale } from "next-intl";

export function useLocationConfirmation() {
    const { provider } = usePersistentMap();
    const { handleSetStep } = useOnboardingProgress();
    const onboardingStore = useOnboardingStore();
    const locale = useLocale();

    useEffect(() => {
        if(!onboardingStore.location) {
            handleSetStep("/onboarding/location");
        }
    }, []);

    const { data } = useQuery({
        queryKey: ["user/city", ...(onboardingStore.location || [])],
        staleTime: Infinity,
        queryFn: async() => {
            if(!onboardingStore.location) return null;
            return getPlaceByCoordinates({
                body: {
                    lng: onboardingStore.location[0],
                    lat: onboardingStore.location[1],
                },
                params: {
                    access_token: provider?.accessToken,
                    types: "place",
                    language: locale,
                },
            })
                .then(({ data }) => data?.features[0])
                .then(mapboxFeatureResponseTransformer.toConfirmationDrawer);
        },
    });

    const handleShowOnMap = (_: MapStore, provider: IMapProvider) => {
        if(data) {
            if(data.place_type.includes("place")) {
                return provider.fitBounds(data?.bbox, {
                    padding: {
                        bottom: 260,
                    },
                });
            }
            if(data.place_type.includes("region")) {
                return provider.flyTo(data?.center, {
                    padding: {
                        bottom: 260,
                    },
                });
            }
        }
    };

    return {
        place: data,
        handleShowOnMap,
    };
}