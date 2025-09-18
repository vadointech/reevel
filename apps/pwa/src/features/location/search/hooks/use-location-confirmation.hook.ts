"use client";

import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePersistentMap } from "@/components/shared/map";
import { useRouter } from "@/i18n/routing";
import { useLocationSearchContext } from "@/features/location/search";
import { LngLat } from "mapbox-gl";

export function useLocationSearchConfirmation() {
    const queryClient = useQueryClient();
    const map = usePersistentMap();
    const router = useRouter();
    const { store, config } = useLocationSearchContext();

    const [place] = useState(() => store.locationToConfirm);

    const handleShowOnMap = useCallback(() => {
        if(!place?.location) {
            router.push(config.callbackUrl);
            return;
        }

        const center = new LngLat(place?.location.longitude, place?.location.latitude);

        if(map.provider.current.internalConfig.viewState.bounds.contains(center)) {
            return;
        }

        if(place?.bbox) {
            map.provider.current.fitBounds(place.bbox);
        } else {
            map.provider.current.flyTo({ center });
        }
    }, [queryClient]);

    return {
        place,
        handleShowOnMap,
    };
}