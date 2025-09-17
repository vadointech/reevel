import { useCallback } from "react";
import { usePersistentMap } from "@/components/shared/map";
import { useRouter } from "@/i18n/routing";
import { useBottomSheet } from "@/components/shared/bottom-sheet";

export function useEventDrawer() {
    const router = useRouter();
    const map = usePersistentMap();
    const bottomSheet = useBottomSheet();

    const handleClose = useCallback(() => {
        map.controller.current.selectPoint(null);
        bottomSheet.controller.current?.closeAsync()
            .then(() => router.back());
    }, []);

    return {
        handleClose,
    };
}