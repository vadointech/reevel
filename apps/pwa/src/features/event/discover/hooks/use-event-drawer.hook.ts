import { useCallback, useEffect } from "react";
import { usePersistentMap } from "@/components/shared/map";
import { useRouter } from "@/i18n/routing";
import { useBottomSheet } from "@/components/shared/bottom-sheet";
import { useEventDrawerContext } from "@/components/drawers/event";

export function useEventDrawer(eventId: string) {
    const router = useRouter();
    const map = usePersistentMap();
    const bottomSheet = useBottomSheet();
    const { config } = useEventDrawerContext();

    const closeDrawer = () => {
        bottomSheet.controller.current?.close();
        router.push(config.callbackUrl);
    };

    const handleClose = useCallback(() => {
        map.controller.current.selectPoint(null);
        closeDrawer();
    }, []);

    const handlePointSelect = useCallback((pointId: string | null) => {
        if(!pointId) closeDrawer();
    }, []);

    useEffect(() => {
        if(!map.store.selectedPoint) {
            map.controller.current.selectPoint(eventId);
        }

        map.controller.current.attachHandlers({
            onPointSelect: handlePointSelect,
        });

        return () => {
            map.controller.current.detachHandlers(["onPointSelect"]);
        };
    }, [handlePointSelect]);

    return {
        handleClose,
    };
}