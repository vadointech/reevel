import styles from "../styles/calendar-search-page.module.scss";
import { getUserCalendarEvents } from "@/api/calendar/server";
import { format, startOfToday } from "date-fns";
import { EventParticipationType } from "@/entities/event";
import { CalendarSearchScreen } from "@/components/screens/calendar";

export namespace CalendarSearchPage {
    export type Props = never;
}

export async function CalendarSearchPage() {
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
        <div className={styles.page}>
            <CalendarSearchScreen
                upcomingEvents={upcomingEvents.events}
                hostingEvents={hostingEvents.events}
                attendingEvents={attendingEvents.events}
            />
        </div>
    );
}
