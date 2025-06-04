import { useCallback, useEffect, useRef } from "react";
import { FetchQueryOptions, useQueryClient } from "@tanstack/react-query";
import { RequestDebouncer } from "@/lib/debouncer";
import { SpatialCache } from "./spatial-cache";
import {
    IMapProvider,
    MapInternalConfig,
    MapProviderGL,
} from "@/components/shared/map/types";

interface IData {
    places: unknown[]
}

type TFetchInput<TInput> = TInput & {
    viewState: MapInternalConfig.IViewStateConfig,
    placeType?: string,
};

type Metadata = {
    regionId: string;
    center: MapProviderGL.LngLat;
    radius: number;
    bounds: MapProviderGL.LngLatBounds;
    zoom: number;
    placeType?: string;
    signal?: AbortSignal;
};

interface QueryBuilder<TData> {
    (metadata: Metadata): FetchQueryOptions<TData>;
    queryKey: (params: unknown[]) => unknown[];
}

interface ConfigParams<TData, TInput> {
    persist?: boolean | { key: string }
    queryBuilder: QueryBuilder<TData>;
    prefetchedData?: TData;
    queryResultProcessor?: (data: TData) => TData;
    onDataFetchResponse?: (response: TData, input: TFetchInput<TInput>) => void;
}

export function useSpatialCache<TData extends IData, TInput extends object = Record<string, unknown>>(mapProvider: IMapProvider, {
    queryBuilder,
    prefetchedData,
    queryResultProcessor,
}: ConfigParams<TData, TInput>) {
    const queryClient = useQueryClient();
    const spatialCache = useRef(new SpatialCache());
    const debouncer = useRef(new RequestDebouncer());
    // const precacheStore = useRef<TData | undefined>(undefined);

    // const persistentStorageKey = useMemo(() => {
    //     if(!persist) return undefined;
    //     if(typeof persist === "object") return persist.key;
    //     return "spatial-cache";
    // }, [persist]);
    //
    // const saveToPersistent = async(key: string) => {
    //     indexedDbService.setItem<TSpatialCacheExtort>(key, spatialCache.current.export());
    // };
    //
    // const loadFromPersistence = async(key: string) => {
    //     const persistData = await indexedDbService.getItem<TSpatialCacheExtort>(key);
    //     if(persistData) {
    //         spatialCache.current.import(persistData);
    //     }
    // };
    //
    // useEffect(() => {
    //     if(persistentStorageKey) {
    //         loadFromPersistence(persistentStorageKey);
    //     }
    //
    //     return () => {
    //         if(persistentStorageKey) {
    //             saveToPersistent(persistentStorageKey);
    //         }
    //     };
    // }, [persistentStorageKey]);

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
            pointsCount: response.places.length,
        });
        // console.log(`✅ Cached ${response.places.length} places for ${regionId}`);
    }, []);

    const fetchSpatialData = useCallback(
        (
            input: TFetchInput<TInput>,
            forceRefresh: boolean = false,
        ) => {
            const { placeType } = input;

            const viewState = {
                ...input.viewState,
                zoom: spatialCache.current.getQuantizedZoom(input.viewState.zoom),
            };


            const { bounds, zoom } = viewState;

            if(!forceRefresh) {
                const coverage = spatialCache.current.getCoverageInfo(bounds, zoom, placeType);
                const requiredCoverage = placeType ? 0.4 : 0.6;

                if(coverage.ratio >= requiredCoverage) {
                    const cache = queryClient.getQueryData<TData>(queryBuilder.queryKey([coverage.currentBestCoveredRegionId]));
                    // console.log(`✅ Cache hit: ${(coverage.ratio * 100).toFixed(1)}% coverage for ${coverage.currentBestCoveredRegionId}`);
                    return debouncer.current.debounceRequest(() => Promise.resolve(cache));
                }
                // console.log(`❌ Cache miss: ${(coverage.ratio * 100).toFixed(1)}% coverage`);
            }

            const regionId = spatialCache.current.createStableRegionId(bounds, zoom, placeType);

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
                            placeType,
                            signal,
                        }),
                    ).then(queryResultProcessor);

                    cacheRegion(regionId, response, viewState, placeType);

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