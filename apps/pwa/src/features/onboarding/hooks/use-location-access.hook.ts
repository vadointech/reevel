"use client";

import { useOnboardingProgress, useOnboardingStore } from "@/features/onboarding";

export function useLocationAccess() {
    const onboardingStore = useOnboardingStore();
    const { handleSetStep } = useOnboardingProgress();

    const handleRequestLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    onboardingStore.setLocation([coords.longitude, coords.latitude], [0, 0, 0, 0]);
                    handleSetStep("/onboarding/location/confirm");
                },
                () => {
                    // TODO: Show modal "We're unable to get your location. (Enter it manually)"
                },
            );
        } else {
            // TODO: Show modal "We're unable to get your location. (Enter it manually)"
        }
    };

    return {
        handleRequestLocation,
    };
}