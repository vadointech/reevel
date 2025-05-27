"use client";

import { useEffect } from "react";
import { useOnboardingProgress, useOnboardingStore } from "@/features/onboarding";
import { useQuery } from "@tanstack/react-query";
import { getPlaceByCoordinates } from "@/api/mapbox/get-place-by-coordinates";
import { usePersistentMap } from "@/components/shared/map/map.context";
import { mapboxFeatureResponseTransformer } from "@/features/mapbox";
import { useLocale } from "next-intl";

export function useLocationConfirmation() {
    const { provider } = usePersistentMap();
    const { handleSetStep } = useOnboardingProgress();
    const onboardingStore = useOnboardingStore();
    const locale = useLocale();

    useEffect(() => {
        if(!onboardingStore.locationCenter) {
            handleSetStep("/onboarding/location");
        }
    }, []);

    const { data } = useQuery({
        queryKey: ["user/city", ...(onboardingStore.locationCenter || [])],
        staleTime: Infinity,
        queryFn: async() => {
            if(!onboardingStore.locationCenter) return null;
            return getPlaceByCoordinates({
                body: {
                    lng: onboardingStore.locationCenter[0],
                    lat: onboardingStore.locationCenter[1],
                },
                params: {
                    access_token: provider.current.config.accessToken,
                    types: "place",
                    language: locale,
                },
            })
                .then(({ data }) => data?.features[0])
                .then(data => {
                    onboardingStore.setLocation(data?.center, data?.bbox);
                    return data;
                })
                .then(mapboxFeatureResponseTransformer.toConfirmationDrawer);
        },
    });

    const handleShowOnMap = () => {
        if(data) {
            if(data.place_type.includes("place")) {
                return provider.current.fitBounds(data?.bbox, {
                    padding: {
                        bottom: 260,
                    },
                });
            }
            if(data.place_type.includes("region")) {
                return provider.current.flyTo({
                    center: data?.center,
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