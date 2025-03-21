"use client";

import { useState, startTransition, useEffect } from "react";
import { InterestEntity } from "@/entities/interests";
import { useEventStore } from "../stores/event-create.store";

export function useInterestPicker(initialInterests: InterestEntity[]) {
    const eventStore = useEventStore();
    const [interests, setInterests] = useState<InterestEntity[]>(initialInterests || []);

    useEffect(() => {
        setInterests(initialInterests || []);
    }, [initialInterests]);

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
