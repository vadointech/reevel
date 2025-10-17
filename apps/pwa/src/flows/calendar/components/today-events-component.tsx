
import { ScrollSection, ScrollSectionSkeleton } from "@/components/sections";
import { Button, EventCard, EventCardSkeleton, Placeholder } from "@/components/ui";
import { IconCalendarCross } from "@/components/icons";
import { CreateEventDrawer } from "@/components/drawers/create-event";
import { Link } from "@/i18n/routing";

import styles from "../styles/calendar-page.module.scss";
import { useQuery } from "@tanstack/react-query";
import { endOfToday, format, startOfToday } from "date-fns";
import { GetUserCalendarEventsQuery } from "@/features/calendar/queries";

export namespace CalendarTodayEventsSlider {
    export type Props = never;
}

export const CalendarTodayEventsSlider = () => {
    const { data: todayEvents, isFetching } = useQuery(
        GetUserCalendarEventsQuery({
            startDate: format(startOfToday(), "yyyy-MM-dd"),
            endDate: format(endOfToday(), "yyyy-MM-dd"),
        }),
    );

    if(isFetching) {
        return (
            <ScrollSectionSkeleton
                title
                className={styles.page__gap}
            >
                {
                    [...new Array(3).keys()].map((item) => (
                        <EventCardSkeleton key={`event-card-skeleton-${item}`} />
                    ))
                }
            </ScrollSectionSkeleton>
        );
    }

    if(!todayEvents || todayEvents.data.length === 0) {
        return (
            <ScrollSection
                title={"Events for today"}
                className={styles.page__gap}
            >
                <Placeholder
                    icon={<IconCalendarCross />}
                    title={"You’re free today"}
                    description={"Add a new event to your calendar"}
                    className={styles.placeholder}
                >
                    <CreateEventDrawer>
                        <Button
                            size={"xsmall"}
                            variant={"secondary-muted"}
                        >
                            New Event
                        </Button>
                    </CreateEventDrawer>
                </Placeholder>
            </ScrollSection>
        );
    }

    return (
        <ScrollSection
            title={"Events for today"}
            className={styles.page__gap}
        >
            {
                todayEvents.data.map(event => (
                    <Link
                        key={event.id}
                        href={"/calendar/event/" + event.id}
                    >
                        <EventCard event={event} />
                    </Link>
                ))
            }
        </ScrollSection>
    );
};
