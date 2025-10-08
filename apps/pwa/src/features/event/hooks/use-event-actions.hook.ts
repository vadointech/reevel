import { useCallback, useRef } from "react";
import { EventEntity } from "@/entities/event";
import { IBottomSheetRootController } from "@/components/shared/bottom-sheet/types";

export function useEventActions(event: EventEntity) {
    const bottomSheetController = useRef<IBottomSheetRootController | null>(null);

    const handleShareEvent = useCallback(async() => {
        try {
            await navigator.share({
                title: event.title,
                text: `Join "${event.title}" on Reevel.`,
                url: window.location.href,
            });
            return true;
        } catch {
            return false;
        }
    }, []);

    const handleCopyLocation = useCallback(async() => {
        try {
            const [lng, lat] = event.locationPoint.coordinates;
            const link = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            await navigator.clipboard.writeText(link);
            bottomSheetController.current?.close();
            return true;
        } catch {
            bottomSheetController.current?.close();
            return false;
        }
    }, []);

    return {
        bottomSheetController,

        handleShareEvent,
        handleCopyLocation,
    };
}