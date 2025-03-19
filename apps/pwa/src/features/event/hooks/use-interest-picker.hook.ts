"use client";

import { useState, startTransition } from "react";
import { InterestEntity } from "@/entities/interests";
import { useEventStore } from "../stores/event-create.store";

export function useInterestPicker(initialInterests: InterestEntity[]) {
    const eventStore = useEventStore();
    const [interests, setInterests] = useState<InterestEntity[]>(initialInterests || []);

    const handlePickInterest = (slug: string) => {
        startTransition(() => {
            if (!interests.some((item) => item.slug === slug)) {
                setInterests((state) => [
                    ...state,
                    eventStore.initialInterests.find((item) => item.slug === slug)!,
                ]);
            }
        });

        if (eventStore.interests.includes(slug)) {
            eventStore.interests = eventStore.interests.filter((item) => item !== slug);
        } else {
            eventStore.addInterest(slug)
        }
    };

    return {
        interests,
        handlePickInterest,
    };
}
