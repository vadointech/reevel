"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QueryBuilderQuery } from "@/lib/react-query/types";

interface IQueryBuilderResponse {
    id: string;
}

type Metadata = {
    lng: number;
    lat: number;
    limit?: number;
};

type ConfigParams<TData extends unknown[]> = {
    queryBuilder: QueryBuilderQuery<Metadata, TData>;
    onSuccess?: (place: TData[number]) => void;
    onFailure?: () => void;
};

export function useLocationAccessRequest<TData extends IQueryBuilderResponse[]>({
    queryBuilder,
    onSuccess,
    onFailure,
}: ConfigParams<TData>) {
    const queryClient = useQueryClient();

    const handleRequestLocationAccess = useCallback(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async({ coords }) => {
                    const place = await queryClient.fetchQuery(
                        queryBuilder({
                            lng: coords.longitude,
                            lat: coords.latitude,
                            limit: 1,
                        }),
                    ).then(response => response[0]);

                    if(place) {
                        return onSuccess?.(place);
                    }
                    return onFailure?.();
                },
                () => onFailure?.(),
            );
        } else {
            onFailure?.();
        }
    }, []);

    return {
        handleRequestLocationAccess,
    };
}