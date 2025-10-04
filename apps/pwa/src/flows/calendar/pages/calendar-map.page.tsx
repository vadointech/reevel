import { CalendarMapScreen } from "@/components/screens/calendar";
import { getUserCalendarEvents } from "@/api/calendar/server";
import { format, startOfToday } from "date-fns";
import { EventParticipationType } from "@/entities/event";

export namespace CalendarMapPage {
    export type Props = never;
}

export async function CalendarMapPage() {
    const upcomingEvents = await getUserCalendarEvents({
        startDate: format(startOfToday(), "yyyy-MM-dd"),
    });


    const hostingEvents = await getUserCalendarEvents({
        startDate: format(startOfToday(), "yyyy-MM-dd"),
        participationType: EventParticipationType.HOSTING,
    });

    const attendingEvents = await getUserCalendarEvents({
        startDate: format(startOfToday(), "yyyy-MM-dd"),
        participationType: EventParticipationType.ATTENDING,
    });

    return (
        <CalendarMapScreen
            upcomingEvents={upcomingEvents.events}
            hostingEvents={hostingEvents.events}
            attendingEvents={attendingEvents.events}
        />
    );
}
