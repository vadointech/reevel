"use client";

import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePersistentMap } from "@/components/shared/map";
import { useRouter } from "@/i18n/routing";
import { useLocationSearchContext } from "@/features/location/search";

export function useLocationSearchConfirmation() {
    const queryClient = useQueryClient();
    const map = usePersistentMap();
    const router = useRouter();
    const { store, config } = useLocationSearchContext();

    const [place] = useState(() => store.locationToConfirm);

    const handleShowOnMap = useCallback(() => {
        if(place?.bbox) {
            map.provider.current.fitBounds(place.bbox);
            return;
        }

        if(place?.location) {
            map.provider.current.flyTo({
                center: {
                    lng: place.location.longitude,
                    lat: place.location.latitude,
                },
            });
            return;
        }

        router.push(config.callbackUrl);
    }, [queryClient]);

    return {
        place,
        handleShowOnMap,
    };
}