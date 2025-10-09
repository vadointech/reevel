"use client";

import { EventEntity } from "@/entities/event";
import { CalendarMapViewDrawer } from "@/components/drawers/calendar";
import { useCalendarMap } from "@/features/calendar/hooks";

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

    const {
        handleSelectParticipationType,
    } = useCalendarMap(upcomingEvents);

    return (
        <CalendarMapViewDrawer
            upcomingEvents={upcomingEvents}
            hostingEvents={hostingEvents}
            attendingEvents={attendingEvents}
            handleSelectParticipationType={handleSelectParticipationType}
        >
            Upcoming events
        </CalendarMapViewDrawer>
    );
};
