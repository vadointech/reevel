import { useCallback, useRef } from "react";
import { FetchQueryOptions, useQueryClient } from "@tanstack/react-query";
import { RequestDebouncer } from "@/lib/debouncer";
import { SpatialCache } from "./spatial-cache";
import { ISpatialCacheConfig } from "./types";
import {
    IMapProvider,
    MapInternalConfig,
    MapProviderGL,
} from "@/components/shared/map/types";

type TFetchInput<TInput> = TInput & {
    viewState: MapInternalConfig.IViewStateConfig,
    filter?: string,
};

type Metadata = {
    regionId: string;
    center: MapProviderGL.LngLat;
    radius: number;
    bounds: MapProviderGL.LngLatBounds;
    zoom: number;
    filter?: string;
    signal?: AbortSignal;
};

export interface ISpatialCacheQueryBuilder<TData> {
    (metadata: Metadata): FetchQueryOptions<TData>;
    queryKey: (params: unknown[]) => unknown[];
}

interface ConfigParams<TData, TInput> {
    persist?: boolean | { key: string }
    queryBuilder: ISpatialCacheQueryBuilder<TData>;
    prefetchedData?: TData;
    onDataFetchResponse?: (response: TData, input: TFetchInput<TInput>) => void;
    cacheConfig?: Partial<ISpatialCacheConfig>;
}

export function useSpatialCache<TData extends unknown[], TInput extends object = Record<string, unknown>>(mapProvider: IMapProvider, {
    queryBuilder,
    prefetchedData,
    cacheConfig,
}: ConfigParams<TData, TInput>) {
    const queryClient = useQueryClient();
    const spatialCache = useRef(new SpatialCache(cacheConfig));
    const debouncer = useRef(new RequestDebouncer());

    const cacheRegion = useCallback((
        regionId: string,
        response: TData,
        { bounds, zoom }: MapInternalConfig.IViewStateConfig,
        placeType?: string,
    ) => {
        spatialCache.current.addRegion({
            id: regionId,
            bounds,
            zoom,
            placeType,
            timestamp: Date.now(),
            pointsCount: response.length,
        });
        // console.log(`✅ Cached ${response.places.length} places for ${regionId}`);
    }, []);

    const fetchSpatialData = useCallback(
        (
            input: TFetchInput<TInput>,
            forceRefresh: boolean = false,
        ) => {
            const { filter } = input;

            const viewState = {
                ...input.viewState,
                zoom: spatialCache.current.getQuantizedZoom(input.viewState.zoom),
            };


            const { bounds, zoom } = viewState;

            if(!forceRefresh) {
                const coverage = spatialCache.current.getCoverageInfo(bounds, zoom, filter);
                const requiredCoverage = filter ? 0.4 : 0.6;

                if(coverage.ratio >= requiredCoverage) {
                    const cache = queryClient.getQueryData<TData>(queryBuilder.queryKey([coverage.currentBestCoveredRegionId]));
                    // console.log(`✅ Cache hit: ${(coverage.ratio * 100).toFixed(1)}% coverage for ${coverage.currentBestCoveredRegionId}`);
                    return debouncer.current.debounceRequest(() => Promise.resolve(cache));
                }
                // console.log(`❌ Cache miss: ${(coverage.ratio * 100).toFixed(1)}% coverage`);
            }

            const regionId = spatialCache.current.createStableRegionId(bounds, zoom, filter);

            const center = bounds.getCenter();
            const radius = mapProvider.getHorizontalRadius(bounds, center);

            return debouncer.current.debounceRequest(
                async(signal) => {
                    const response = await queryClient.fetchQuery<TData>(
                        queryBuilder({
                            regionId,
                            center,
                            radius,
                            bounds,
                            zoom,
                            filter,
                            signal,
                        }),
                    );

                    cacheRegion(regionId, response, viewState, filter);

                    return response;
                },
                1000,
            );
        }, [cacheRegion]);

    const precacheSpatialData = useCallback((viewState: MapInternalConfig.IViewStateConfig) => {
        if(!prefetchedData) return;

        const viewStateToCache = {
            ...viewState,
            zoom: spatialCache.current.getQuantizedZoom(viewState.zoom),
        };

        const regionId = spatialCache.current.createStableRegionId(
            viewStateToCache.bounds,
            viewStateToCache.zoom,
        );

        queryClient.setQueryData(queryBuilder.queryKey([regionId]), prefetchedData);
        cacheRegion(regionId, prefetchedData, viewStateToCache);
    }, [prefetchedData]);

    return {
        spatialCache,
        fetchSpatialData,
        precacheSpatialData,
        cacheRegion,
    };
}