"use client";

import { useCallback } from "react";
import { GetPlacesByCoordinatesQueryBuilder } from "@/features/location/picker/queries";
import { useQueryClient } from "@tanstack/react-query";

type Callback = {
    onSuccess: (place: GetPlacesByCoordinatesQueryBuilder.TOutput[number]) => void;
    onFailure: () => void;
};

export function useLocationAccess(callbacks: Partial<Callback> = {}) {
    const queryClient = useQueryClient();

    const handleRequestLocationAccess = useCallback(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async({ coords }) => {
                    const place = await queryClient.fetchQuery(
                        GetPlacesByCoordinatesQueryBuilder({
                            lng: coords.longitude,
                            lat: coords.latitude,
                        }),
                    ).then(response => response[0]);

                    if(place) return callbacks.onSuccess?.(place);
                    return callbacks.onFailure?.();
                },
                () => callbacks.onFailure?.(),
            );
        } else {
            callbacks.onFailure?.();
        }
    }, []);

    return {
        handleRequestLocationAccess,
    };
}