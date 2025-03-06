"use client";

import { useEffect } from "react";
import { useOnboardingProgress, useOnboardingStore } from "@/features/onboarding";
import { useQuery } from "@tanstack/react-query";
import { getPlaceByCoordinates } from "@/api/mapbox/get-place-by-coordinates";
import { IMapboxProvider } from "@/components/persistent-map/providers";
import { usePersistentMap } from "@/components/persistent-map/map.context";

export function useLocationConfirmation() {
    const { provider } = usePersistentMap();
    const { handleSetStep } = useOnboardingProgress();
    const onboardingStore = useOnboardingStore();

    useEffect(() => {
        if(!onboardingStore.location) {
            handleSetStep("/onboarding/location");
        }
    }, []);

    const { data } = useQuery({
        queryKey: ["user/city"],
        queryFn: async() => {
            if(!onboardingStore.location) return null;
            return getPlaceByCoordinates({
                body: {
                    lng: onboardingStore.location[0],
                    lat: onboardingStore.location[0],
                },
                params: {
                    access_token: provider?.accessToken,
                    types: "place,region",
                },
            })
                .then(({ data }) => data?.features[0]);
        },
    });

    const handleShowOnMap = (provider: IMapboxProvider) => {
        if(data) {
            if(data.place_type.includes("place")) {
                provider.fitBounds(data?.bbox, {
                    padding: {
                        bottom: 260,
                    },
                });
            }
            if(data.place_type.includes("region")) {
                provider.flyTo(data?.center, {
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