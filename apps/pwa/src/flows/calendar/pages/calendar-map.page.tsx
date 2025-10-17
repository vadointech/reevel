"use client";

import { CalendarMapViewDrawer } from "@/components/drawers/calendar";
import { useCalendarMap } from "@/features/calendar/hooks";

export namespace CalendarMapPage {
    export type Props = never;
}

export function CalendarMapPage() {
    const {
        handlePickParticipationType,
    } = useCalendarMap();

    return (
        <CalendarMapViewDrawer
            handleSelectParticipationType={handlePickParticipationType}
        >
            Upcoming events
        </CalendarMapViewDrawer>
    );
}
