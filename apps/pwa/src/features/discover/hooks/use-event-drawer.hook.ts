import { useCallback, useEffect } from "react";
import { usePersistentMap } from "@/components/shared/map";
import { useRouter } from "@/i18n/routing";
import { useBottomSheet } from "@/components/shared/bottom-sheet";
import { EventEntity } from "@/entities/event";
import { eventEntityToEventPointEntity } from "@/features/event/mappers";

export function useEventDrawer(event: EventEntity) {
    const router = useRouter();
    const map = usePersistentMap();
    const bottomSheet = useBottomSheet();

    useEffect(() => {
        if(map.store.selectedPoint === null) {
            if(!map.controller.current.isPointOnMap(event.id)) {
                map.controller.current.appendPoints([eventEntityToEventPointEntity(event)]);
            }

            map.controller.current.selectPoint(event.id, {
                clearUnactive: true,
            });
        }
    }, []);

    const handleClose = useCallback(() => {
        map.controller.current.selectPoint(null);
    }, []);

    const handleSelectPoint = useCallback(() => {
        bottomSheet.controller?.closeAsync()
            .then(() => router.back());
    }, []);

    useEffect(() => {
        map.controller.current.attachHandlers({
            onPointSelect: handleSelectPoint,
        });
    }, []);

    return {
        handleClose,
    };
}