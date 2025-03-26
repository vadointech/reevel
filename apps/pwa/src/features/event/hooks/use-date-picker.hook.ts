"use client";

import { useEffect, useState } from "react";

import { useEventStore } from "../stores/event-create.store";

export function useDatePicker(defaultAvatars: string[]) {
    const eventStore = useEventStore();

    const [avatars, setAvatars] = useState<string[]>(defaultAvatars);



    const handleMonth = (month: number) => {
        if (eventStore.dateStore.toggle == true) {
            eventStore.dateStore.setStartMonth(avatars[month])
        } else {
            eventStore.dateStore.setEndMonth(avatars[month])
        }
    };

    const handleDate = (month: number) => {
        if (eventStore.dateStore.toggle) {
            eventStore.dateStore.setStartDate(avatars[month])
        } else {
            eventStore.dateStore.setEndDate(avatars[month])
        }
    };

    return {
        avatars,
        handleMonth,
        handleDate,
    };
}
