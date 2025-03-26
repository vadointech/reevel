"use client";

import { useEffect, useState } from "react";

import { useEventStore } from "../stores/event-create.store";

export function useDatePicker(defaultAvatars: string[], selectedStart: boolean) {
    const eventStore = useEventStore();

    const [avatars, setAvatars] = useState<string[]>(defaultAvatars);

    useEffect(() => {
        console.log("useDatePicker selectedStart:", selectedStart);
    }, [selectedStart]);

    const handleMonth = (month: number) => {
        console.log(selectedStart)
        if (selectedStart == true) {
            eventStore.dateStore.setStartMonth(avatars[month])
        } else {
            eventStore.dateStore.setEndMonth(avatars[month])
        }
    };

    const handleDate = (month: number) => {
        if (selectedStart) {
            eventStore.dateStore.setStartDate(avatars[month])
        } else {
            // eventStore.dateStore.setEndDate(avatars[month])
        }
    };

    return {
        avatars,
        handleMonth,
        handleDate,
    };
}
