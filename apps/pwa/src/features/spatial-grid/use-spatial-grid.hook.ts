import { useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { RequestDebouncer } from "@/lib/debouncer";
import { MapInternalConfig } from "@/components/shared/map/types";
import { QueryBuilderQuery } from "@/lib/react-query";
import { SpatialGrid } from "@repo/spatial-grid";

type TFetchInput<TInput> = TInput & {
    viewState: MapInternalConfig.IViewStateConfig,
    debounce?: boolean;
    filter?: string,
};

type Metadata = {
    tileId: string;
    zoom: number;
    filter?: string;
    signal?: AbortSignal;
};

interface ConfigParams<TData, TInput> {
    persist?: boolean | { key: string }
    queryBuilder: QueryBuilderQuery<Metadata, TData>;
    prefetchedData?: TData;
    onDataFetchResponse?: (response: TData, input: TFetchInput<TInput>) => void;
}

export function useSpatialGrid<TData extends unknown[], TInput extends object = Record<string, unknown>>({
    queryBuilder,
    prefetchedData,
}: ConfigParams<TData, TInput>) {
    const queryClient = useQueryClient();
    const spatialCache = useRef(
        new SpatialGrid(),
    );
    const debouncer = useRef(new RequestDebouncer());

    const fetchSpatialData = useCallback((input: TFetchInput<TInput>, debounce: boolean = true): Promise<TData> => {
        const { viewState, filter } = input;

        const tile = spatialCache.current.getTile(
            viewState.bounds.getCenter(),
            viewState.zoom,
        );

        const fetchFunc = () => queryClient.fetchQuery<TData>(
            queryBuilder({
                tileId: tile.hash,
                zoom: tile.zoom,
                filter,
            }),
        );

        if(debounce) {
            return debouncer.current.debounceRequest(fetchFunc, 500);
        }
        return fetchFunc();
    }, []);

    const precacheSpatialData = useCallback((viewState: MapInternalConfig.IViewStateConfig) => {
        if(!prefetchedData) return;

        const tile = spatialCache.current.getTile(
            viewState.bounds.getCenter(),
            viewState.zoom,
        );

        queryClient.setQueryData(
            queryBuilder.queryKey([tile.hash, tile.zoom]),
            prefetchedData,
        );
    }, [prefetchedData]);

    return {
        spatialCache,
        fetchSpatialData,
        precacheSpatialData,
    };
}