"use client";

import { useState, startTransition } from "react";
import { InterestEntity } from "@/entities/interests";
import { useEventStore } from "../stores/event-create.store";

export function useInterestPicker(initialInterests: InterestEntity[]) {
    const eventStore = useEventStore();
    const [interests, setInterests] = useState<InterestEntity[]>(initialInterests || []);

    const handlePickInterest = (interest: InterestEntity) => {
        startTransition(() => {
            if (!interests.some((item) => item.slug === interest.slug)) {
                setInterests((state) => [
                    ...state,
                    interest,
                ]);
            }
        });

        if (eventStore.interests.some((item) => item.slug === interest.slug)) {
            eventStore.interests = eventStore.interests.filter((item) => item.slug !== interest.slug);
        } else {
            eventStore.addInterest(interest);
        }
    };

    return {
        interests,
        handlePickInterest,
    };
}
