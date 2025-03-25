"use client";

import { useEffect, useState } from "react";

import { useEventStore } from "../stores/event-create.store";

export function useDatePicker(defaultAvatars: string[]) {
    const eventStore = useEventStore();

    const [avatars, setAvatars] = useState<string[]>(defaultAvatars);

    const handleSetAvatar = (month: string) => {
    };

    return {
        avatars,
        handleSetAvatar,
    };
}
