"use client";

import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { GetLocationByNameQueryBuilder } from "@/features/location/search/queries";
import { PlaceLocationEntity } from "@/entities/place";
import { useSearchParams } from "next/navigation";
import { usePersistentMap } from "@/components/shared/map";
import { useRouter } from "@/i18n/routing";
import { useLocationSearchContext } from "@/features/location/search";

export function useLocationSearchConfirmation() {
    const queryClient = useQueryClient();
    const params = useSearchParams();
    const map = usePersistentMap();
    const router = useRouter();
    const { config } = useLocationSearchContext();

    const [place] = useState(() => {
        const queryData = queryClient.getQueriesData<PlaceLocationEntity[]>({
            queryKey: GetLocationByNameQueryBuilder.queryKey(),
        }).flatMap(([, data]) => data);

        return queryData.find(item => item?.id === params.get(config.confirmationParam));
    });

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