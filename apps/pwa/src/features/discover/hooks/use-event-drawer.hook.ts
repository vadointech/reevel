import { useCallback, useEffect } from "react";
import { usePersistentMap } from "@/components/shared/map";
import { useRouter } from "@/i18n/routing";
import { useBottomSheet } from "@/components/shared/bottom-sheet";
import { EventEntity } from "@/entities/event";

export function useEventDrawer(event: EventEntity) {
    const router = useRouter();
    const map = usePersistentMap();
    const bottomSheet = useBottomSheet();

    useEffect(() => {
        if(map.store.selectedPoint === event.id) return;
        map.controller.current.selectPoint(event.id);
    }, []);

    const handleClose = useCallback(() => {
        map.controller.current.selectPoint(null);
        bottomSheet.controller?.closeAsync()
            .then(() => router.back());
    }, []);

    return {
        handleClose,
    };
}