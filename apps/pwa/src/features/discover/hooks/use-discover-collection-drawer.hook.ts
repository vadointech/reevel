import { useState } from "react";
import { EventEntity } from "@/entities/event";
import { useDiscoverContext } from "@/features/discover";

export function useDiscoverCollectionDrawer(collectionId: string, eventsInit: EventEntity[]) {
    const discover = useDiscoverContext();

    const getDefaultSliderIndex = (point: string | null, collection: string) => {
        if(collection !== collectionId) return 0;

        if(point === null) return 0;

        const index = eventsInit.findIndex(item => item.id === point);
        if(index !== -1) return index;

        return 0;
    };

    const getDefaultDrawerSnapPoint = (interest: string | null, collection: string) => {
        if(collection !== collectionId) return 2;

        if(interest !== null) return 1;

        return 2;
    };

    const [defaultSliderIndex] = useState<number>(() =>
        getDefaultSliderIndex(
            discover.store.pointToPreview,
            discover.store.collectionToPreview,
        ),
    );

    const [defaultDrawerSnapPoint] = useState<number>(() =>
        getDefaultDrawerSnapPoint(
            discover.store.interestFilter,
            discover.store.collectionToPreview,
        ),
    );

    return {
        defaultSliderIndex,
        defaultDrawerSnapPoint,
        getDefaultSliderIndex,
    };
}