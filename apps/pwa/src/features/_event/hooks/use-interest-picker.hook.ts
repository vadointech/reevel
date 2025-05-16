"use client";

import { useState, useEffect } from "react";
import { InterestEntity } from "@/entities/interests";
import { useEventStore } from "../stores/event-create.store";

export function useInterestPicker(initialInterests: InterestEntity[]) {
    const eventStore = useEventStore();
    const [interests, setInterests] = useState<InterestEntity[]>(initialInterests || []);

    useEffect(() => {
        const combinedInterests = [...eventStore.interests];

        initialInterests.forEach(interest => {
            if (!combinedInterests.some(storeInterest => storeInterest.slug === interest.slug)) {
                combinedInterests.push(interest);
            }
        });

        setInterests(combinedInterests);
    }, [initialInterests, eventStore.interests]);

    const handlePickInterest = (interest: InterestEntity) => {
        const isSelected = eventStore.interests.some((item) => item.slug === interest.slug);

        if (isSelected) {
            eventStore.removeInterest(interest);
        } else {
            eventStore.addInterest(interest);
        }
    };

    return {
        interests,
        handlePickInterest,
    };
}
