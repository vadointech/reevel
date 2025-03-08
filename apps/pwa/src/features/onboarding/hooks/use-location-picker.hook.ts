"use client";

import { useOnboardingProgress, useOnboardingStore } from "@/features/onboarding";
import { useQueryClient } from "@tanstack/react-query";
import { MapboxFeatureResponse } from "@/api/mapbox/types";
import { mapboxFeatureResponseTransformer } from "@/features/mapbox";
import { useCallback } from "react";

export function useLocationPicker() {
    const onboardingStore = useOnboardingStore();
    const { handleNextStep } = useOnboardingProgress();
    const queryClient = useQueryClient();

    const pickerRef = useCallback((ref: HTMLDivElement | null) => {
        if (ref) {
            if(ref.childNodes.length === 0) return;

            const currentLocation = onboardingStore.location?.join(",") || "";
            if(!currentLocation) return;


            for (const [index, child] of ref.childNodes.entries()) {
                const childNode = child instanceof HTMLDivElement ? child : null;
                if(!childNode) continue;

                const childLocation = childNode.dataset.location;
                if (childLocation && childLocation === currentLocation) {
                    requestAnimationFrame(() => {
                        ref.scrollTo({
                            top: index * childNode.scrollHeight,
                        });
                    });
                }
            }
        }
    }, [onboardingStore.location]);


    const handleSelectLocation = (feature: MapboxFeatureResponse) => {
        const location = feature.center;
        onboardingStore.setLocation(location[0], location[1]);
        queryClient.setQueryData<MapboxFeatureResponse>(["user/city", ...location], () => {
            return mapboxFeatureResponseTransformer.toConfirmationDrawer(feature);
        });
        handleNextStep();
    };

    return {
        pickerRef,
        handleSelectLocation,
    };
}