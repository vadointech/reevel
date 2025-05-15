"use client";

import { useState, useMemo } from "react";
import { useEventStore } from "../stores/event-create.store";

export function useDatePicker(defaultAvatars: string[] = []) {
    const eventStore = useEventStore();
    const [data, setData] = useState<string[]>(defaultAvatars);
    const [error, setError] = useState<string>()

    const currentYear = new Date().getFullYear();
    const currentDate = new Date()

    const monthMap: Record<string, number> = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    const isStartDate = eventStore.dateStore.toggle;
    const selectedMonthName = isStartDate ? eventStore.dateStore.startMonth : eventStore.dateStore.endMonth;
    const currentMonth = selectedMonthName ? monthMap[selectedMonthName] : new Date().getMonth();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const daySlides = useMemo(() => {
        return [...Array(daysInMonth)].map((_, i) => {
            const dayDate = new Date(currentYear, currentMonth, i + 1);
            const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
            return { day: dayName, label: (i + 1).toString() };
        });
    }, [currentMonth, currentYear, daysInMonth]);




    const handleHour = (hour: number) => {
        if (eventStore.dateStore.toggle) {
            eventStore.dateStore.setStartHour(data[hour])
        } else {
            eventStore.dateStore.setEndHour(data[hour])
        }
    }

    const handleMinute = (minute: number) => {
        if (eventStore.dateStore.toggle) {
            eventStore.dateStore.setStartMinute(data[minute])
        } else {
            eventStore.dateStore.setEndMinute(data[minute])
        }
    }

    return {
        data,
        error: error,
        daySlides,
        currentMonth,
        daysInMonth,

        handleHour,
        handleMinute,
    };
}