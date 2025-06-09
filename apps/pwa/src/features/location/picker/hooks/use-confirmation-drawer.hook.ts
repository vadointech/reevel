import { useCallback, useEffect, useMemo, useRef } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useLocationPicker } from "../location-picker.context";
import { GetNearbyPlacesQueryBuilder, GetPlacesByCoordinatesQueryBuilder } from "../queries";

import { usePersistentMap } from "@/components/shared/map";

import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";

import { Point, IconPoint, MapInternalConfig } from "@/components/shared/map/types";
import { GooglePlacesApiResponse, GooglePlacesApiResponsePlace } from "@/api/google/places/types";
import { IBottomSheetRootController } from "@/components/shared/_redesign/bottom-sheet/types";

export function useConfirmationDrawer(placesInit: GooglePlacesApiResponse) {
    const queryClient = useQueryClient();
    const map = usePersistentMap();
    const { confirmationStore } = useLocationPicker();

    const pointsBuffer = useRef<Point<IconPoint>[]>([]);

    const pickerDrawerControls = useRef<IBottomSheetRootController>(null);
    const confirmationDrawerControls = useRef<IBottomSheetRootController>(null);

    const confirmationDataRef = useRef<Partial<GooglePlacesApiResponsePlace>>(undefined);

    const isInsideBounds = useRef(true);

    const confirmationViewState = useRef<MapInternalConfig.IViewStateConfig>(undefined);

    useEffect(() => {
        const point = confirmationStore.point;

        if(point) {
            pickerDrawerControls.current?.setPositionBySnapIndex(1);

            moveViewStateToPoint(point, false);

            pointsBuffer.current = googlePlacesApiResponseMapper.toIconPoint(placesInit);
            map.controller.current.setPoints([point]);
            map.controller.current.selectPoint(point.id);
            handleSelectPoint(point.id);
        }

        return () => {
            confirmationStore.setPoint(null);
            map.controller.current.selectPoint(null);
        };
    }, []);

    const pickerDrawerDefaultSnapIndex = useMemo(() => {
        return confirmationStore.point ? 1 : 0; // 0 - fit-content, 1 - 0.14
    }, []);

    const getLocationPickerQueryData = (placeId: string) => {
        const data = queryClient.getQueriesData<GooglePlacesApiResponse>({
            queryKey: GetNearbyPlacesQueryBuilder.queryKey(),
        });

        const places = data.flatMap(([, data]) => data?.places || []);
        return places.find(place => place.id === placeId);
    };
    const moveViewStateToPoint = (point: Point<IconPoint>, checkBuffer: boolean = true) => {
        const { bounds: defaultBounds } = map.provider.current.internalConfig.viewState;

        if(!defaultBounds.contains(point.geometry.coordinates)) {
            isInsideBounds.current = false;
            map.provider.current.flyTo({
                center: point.geometry.coordinates,
            });

            return;
        }

        if(!checkBuffer) return;

        confirmationViewState.current = map.provider.current.getViewState();
        const { bounds, zoom } = confirmationViewState.current;

        const bufferedBounds = map.provider.current.getBufferedBounds(bounds, .2);

        if(!bufferedBounds.contains(point.geometry.coordinates)) {
            isInsideBounds.current = false;

            if(bounds.contains(point.geometry.coordinates)) {
                const duration = map.provider.current.getDynamicDuration(
                    bounds.getCenter(),
                    point.geometry.coordinates,
                );

                map.provider.current.flyTo({
                    center: point.geometry.coordinates,
                    zoom,
                    duration,
                });
            }
        }
    };

    const resetViewState = (point: Point<IconPoint> | null) => {
        isInsideBounds.current = true;

        if(!point) return;

        const { bounds } = map.provider.current.internalConfig.viewState; // Bounds for users' city

        if(!bounds.contains(point.geometry.coordinates)) {
            map.provider.current.resetViewState(); // Reset to our city default viewState
        } else {
            if(confirmationViewState.current) {
                const duration = map.provider.current.getDynamicDuration(
                    confirmationViewState.current.bounds.getCenter(),
                    point.geometry.coordinates,
                );
                map.provider.current.resetViewState(undefined, {
                    duration,
                    ...confirmationViewState.current,
                });
            }
        }
    };

    const handleSelectPoint = useCallback((pointId: string | null) => {
        if(!pointId) {
            return;
        }

        const data = getLocationPickerQueryData(pointId);
        if(!data) return;

        const [point] = googlePlacesApiResponseMapper.toIconPoint({ places: [data] });
        if(!point) return;
        confirmationStore.setPoint(point);
        moveViewStateToPoint(point);

        confirmationDataRef.current = data;
        pickerDrawerControls.current?.setPositionBySnapIndex(1);
        confirmationDrawerControls.current?.open();
    }, []);

    const handleConfirmationClose = () => {
        if(pointsBuffer.current.length > 0) {
            map.controller.current.replacePoints(pointsBuffer.current, 100);
            pointsBuffer.current = [];
        }

        if(!isInsideBounds.current) {
            resetViewState(confirmationStore.point);
        }

        pickerDrawerControls.current?.setPositionBySnapIndex(0);
        map.controller.current.selectPoint(null);
        confirmationStore.setPoint(null);
    };

    const handleLocationAccessRequest = useCallback(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async({ coords }) => {
                    const point = await queryClient.fetchQuery(
                        GetPlacesByCoordinatesQueryBuilder({}),
                    ).then(googlePlacesApiResponseMapper.toIconPoint).then(points => points[0]);

                    if(point) {
                        pickerDrawerControls.current?.setPositionBySnapIndex(1);

                        moveViewStateToPoint(point, false);

                        pointsBuffer.current = googlePlacesApiResponseMapper.toIconPoint(placesInit);
                        map.controller.current.setPoints([point]);
                        map.controller.current.selectPoint(point.id);
                        handleSelectPoint(point.id);
                    }
                },
                () => {
                    // TODO: Show modal "We're unable to get your location. (Enter it manually)"
                },
            );
        } else {
            // TODO: Show modal "We're unable to get your location. (Enter it manually)"
        }
    }, []);

    return {
        confirmationDataRef,
        pickerDrawerControls,
        confirmationDrawerControls,
        pickerDrawerDefaultSnapIndex,
        handleSelectPoint,
        handleConfirmationClose,
        handleLocationAccessRequest,
    };
}