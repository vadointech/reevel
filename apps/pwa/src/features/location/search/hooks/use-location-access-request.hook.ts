"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { QueryBuilderQuery } from "@/lib/react-query/types";

interface IQueryBuilderResponse {
    id: string;
}

type IQueryBuilderInput = {
    longitude: number;
    latitude: number;
};

type ConfigParams<TData extends unknown[]> = {
    queryBuilder: QueryBuilderQuery<IQueryBuilderInput, TData, null>;
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
                            longitude: coords.longitude,
                            latitude: coords.latitude,
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