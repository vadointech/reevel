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

type QueryBuilder<TData> = (metadata: {
    regionId: string;
    center: MapProviderGL.LngLat;
    radius: number;
    bounds: MapProviderGL.LngLatBounds;
    zoom: number;
    placeType?: string;
    signal?: AbortSignal;
}) => FetchQueryOptions<TData>;

interface ConfigParams<TData> {
    queryBuilder: QueryBuilder<TData>;
    prefetchedData?: TData | null;
    queryResultProcessor?: (data: TData) => TData;
    onProviderInitialized?: () => void;
}

export function useSpatialCache<TData extends IData>(mapProvider: IMapProvider, {
    queryBuilder,
    prefetchedData = null,
    queryResultProcessor,
    onProviderInitialized,
}: ConfigParams<TData>) {
    const queryClient = useQueryClient();
    const spatialCache = useRef(new SpatialCache());
    const debouncer = useRef(new RequestDebouncer());
    const precacheStore = useRef<TData | null>(null);

    useEffect(() => {
        const defaultViewState = mapProvider.internalConfig.viewState;
        const viewState = mapProvider.getViewState();

        if(viewState.zoom !== defaultViewState.zoom) { // Map initialized on the root page
            const regionId = spatialCache.current.createStableRegionId(
                viewState.bounds,
                viewState.zoom,
            );

            onProviderInitialized?.();

            writePrefetchedData(regionId, viewState);
        } else { // Map initialized on the root page
            precacheStore.current = prefetchedData;
        }

        return () => {
            spatialCache.current.clear();
        };
    }, [prefetchedData, onProviderInitialized]);


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
            minValidZoom: zoom - 2,
            maxValidZoom: zoom + 2,
            density: response.places.length,
            actualPlaceCount: response.places.length,
        });
        // console.log(`✅ Cached ${response.places.length} places for ${regionId}`);
    }, []);

    const writePrefetchedData = useCallback((regionId: string, viewState: MapInternalConfig.IViewStateConfig) => {
        if(!prefetchedData) return;
        queryClient.setQueryData(["places", regionId], prefetchedData);
        cacheRegion(regionId, prefetchedData, viewState);
        precacheStore.current = null;
    }, []);

    const fetchSpatialData = useCallback(
        (
            viewState: MapInternalConfig.IViewStateConfig,
            placeType?: string,
            forceRefresh: boolean = false,
        ) => {
            const { bounds, zoom } = viewState;
            const regionId = spatialCache.current.createStableRegionId(bounds, zoom, placeType);
            const quantizedZoom = spatialCache.current.getQuantizedZoom(zoom);

            const center = bounds.getCenter();
            const radius = mapProvider.getHorizontalRadius(bounds, center);

            if(!forceRefresh) {
                const coverage = spatialCache.current.getCoverageRatio(bounds, quantizedZoom, placeType);

                const requiredCoverage = placeType ? 0.4 : 0.6;

                if (coverage >= requiredCoverage) {
                    // console.log(`✅ Cache hit: ${(coverage * 100).toFixed(1)}% coverage for ${regionId}`);
                    return new Promise<TData>((resolve) =>
                        resolve(
                            (queryClient.getQueryData(["places", regionId]) || { places: [] }) as TData,
                        ),
                    );
                }
                // console.log(`❌ Cache miss: ${(coverage * 100).toFixed(1)}% coverage for ${regionId}`);
            }

            if(precacheStore.current && prefetchedData) {
                writePrefetchedData(regionId, viewState);
                return new Promise<TData>((resolve) =>
                    resolve(prefetchedData),
                );
            }

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

    return {
        spatialCache,
        fetchSpatialData,

        cacheRegion,
        precacheStore,
        writePrefetchedData,
    };
}