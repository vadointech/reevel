import { useEffect, useRef } from "react";
import { IBottomSheetRootController } from "@/components/shared/_redesign/bottom-sheet/types";
import { GooglePlacesApiResponsePlace } from "@/api/google/places/types";
import { GetNearbyPlaces } from "@/api/google/places";
import { useQueryClient } from "@tanstack/react-query";
import { usePersistentMap } from "@/components/shared/map";
import { useLocationPicker } from "@/features/location/picker";
import { IconPoint, Point } from "@/components/shared/map/types";
import { googlePlacesApiResponseMapper } from "@/infrastructure/google/mappers";

export function useConfirmationDrawer() {
    const queryClient = useQueryClient();

    const confirmationDataRef = useRef<Partial<GooglePlacesApiResponsePlace> | undefined>(undefined);
    const confirmationDrawerControls = useRef<IBottomSheetRootController>(null);

    const persistentMap = usePersistentMap();

    const { confirmationStore } = useLocationPicker();

    const pointsBuffer = useRef<Point<IconPoint>[]>([]);

    useEffect(() => {
        // const point = confirmationStore.point;
        //
        // if(point) {
        //     const mapPoints = persistentMap.store.points;
        //     const onMap = mapPoints.some(item => item.id === point.id);
        //
        //     if(onMap) {
        //         pointsBuffer.current = persistentMap.store.points;
        //         persistentMap.controller.current.setPoints(
        //             pointsBuffer.current.filter(item => item.properties.id === point.properties.id),
        //         );
        //         persistentMap.controller.current.selectPoint(point.properties.id);
        //         handleSelectPoint(point.properties.id);
        //     } else {
        //         const data = getLocationPickerQueryData(point.id);
        //         if(data) {
        //             pointsBuffer.current = persistentMap.store.points;
        //             persistentMap.controller.current.setPoints(
        //                 googlePlacesApiResponseMapper.toIconPoint({places: [data]}),
        //             );
        //             persistentMap.controller.current.selectPoint(point.properties.id);
        //             persistentMap.provider.current.flyTo({
        //                 center: point.geometry.coordinates,
        //                 padding: { bottom: 260 },
        //             });
        //         }
        //     }
        // }
    }, []);

    const getLocationPickerQueryData = (placeId: string) => {
        // const data = queryClient.getQueriesData<GetNearbyPlaces.TOutput>({
        //     queryKey: [...GetNearbyPlaces.queryKey],
        // });
        // const places = data.flatMap(([, data]) => data?.places || []);
        // return places.find(place => place.id === placeId);
    };

    const handleSelectPoint = (pointId: string | null) => {
        // if(!pointId) {
        //     pointsBuffer.current = [];
        //     return;
        // }
        //
        // confirmationDrawerControls.current?.open();
        // const data = getLocationPickerQueryData(pointId);
        //
        // if(data) {
        //     confirmationDataRef.current = data;
        //     confirmationDrawerControls.current?.open();
        // } else {
        //     // TODO: fetch
        //     console.log("fetch data");
        // }
    };

    const handleConfirmationClose = () => {
        // if(pointsBuffer.current.length > 0) {
        //     persistentMap.controller.current.replacePoints(pointsBuffer.current, 100);
        //     pointsBuffer.current = [];
        // }
        // persistentMap.controller.current.selectPoint(null);
        // persistentMap.provider.current.resetViewState();
    };

    return {
        confirmationDataRef,
        confirmationDrawerControls,
        handleSelectPoint,
        handleConfirmationClose,
    };
}