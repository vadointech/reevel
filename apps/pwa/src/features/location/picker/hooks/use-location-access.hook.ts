"use client";

type Callback = {
    onSuccess: (coords: GeolocationCoordinates) => void;
    onFailure: () => void;
};

export function useLocationAccess(callbacks: Partial<Callback> = {}) {
    const handleRequestLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    callbacks.onSuccess?.(coords);
                },
                () => {
                    // TODO: Show modal "We're unable to get your location. (Enter it manually)"
                    callbacks.onFailure?.();
                },
            );
        } else {
            // TODO: Show modal "We're unable to get your location. (Enter it manually)"
            callbacks.onFailure?.();
        }
    };

    return {
        handleRequestLocation,
    };
}