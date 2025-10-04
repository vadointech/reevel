"use client";

import { EventEntity } from "@/entities/event";
import { CalendarMapViewDrawer } from "@/components/drawers/calendar";

export namespace CalendarMapScreen {
    export type Props = {
        upcomingEvents: EventEntity[];
        hostingEvents: EventEntity[];
        attendingEvents: EventEntity[];
    };
}

export const CalendarMapScreen = ({
    upcomingEvents,
    hostingEvents,
    attendingEvents,
}: CalendarMapScreen.Props) => {
    return (
        <CalendarMapViewDrawer
            upcomingEvents={upcomingEvents}
            hostingEvents={hostingEvents}
            attendingEvents={attendingEvents}
        >
            Upcoming events
        </CalendarMapViewDrawer>
    );
};
