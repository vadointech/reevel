"use client";

import { useState, useEffect } from "react";
import { useEventStore } from "../stores/event-create.store";

export function usePosterPicker(initialPosters: string[]) {
    const eventStore = useEventStore();
    const [posters, setPoster] = useState<string[]>(initialPosters);

    useEffect(() => {
        setPoster(state => {
            const picture = eventStore.poster;
            if (!picture) return state;
            if (state.includes(picture)) return state;
            return [picture, ...state];
        });
    }, [eventStore.poster]);

    const handlePickPoster = (poster: string) => {
        const isSelected = eventStore.poster == poster
        if (isSelected) {
            eventStore.setPoster("");
        } else eventStore.setPoster(poster);

    };

    return {
        posters,
        handlePickPoster,
    };
}
