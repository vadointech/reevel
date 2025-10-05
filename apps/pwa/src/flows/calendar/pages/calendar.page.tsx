import { IconMap, IconSearch } from "@/components/icons";

import { Avatar, EventCard, InterestButton, OptionsList } from "@/components/ui";
import { Link } from "@/i18n/routing";

import { ScrollSection } from "@/components/sections";
import { TabsBody, TabsRoot } from "@/components/shared/tabs";
import { EventListItemCard } from "@/components/ui";

import { getUserCalendarEvents } from "@/api/calendar/server";

import { format, startOfToday, endOfToday } from "date-fns";
import { EventParticipationType } from "@/entities/event";

import styles from "../styles/calendar-page.module.scss";
import { getSession } from "@/api/user/server";

export namespace CalendarPage {
    export type Props = never;
}

export async function CalendarPage() {
    const session = await getSession();

    const todayEvents = await getUserCalendarEvents({
        startDate: format(startOfToday(), "yyyy-MM-dd"),
        endDate: format(endOfToday(), "yyyy-MM-dd"),
    });

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

    const tabsContent: TabsBody.Content[] = [
        {
            label: `Upcoming • ${upcomingEvents.pagination.totalItems}`,
            value: (
                <OptionsList>
                    {
                        upcomingEvents.events.slice(0, 3).map(event => (
                            <Link
                                key={event.id}
                                href={"/calendar/event/" + event.id}
                            >
                                <EventListItemCard event={event} />
                            </Link>
                        ))
                    }
                </OptionsList>
            ),
        },

        {
            label: `Hosting • ${hostingEvents.pagination.totalItems}`,
            value: (
                <OptionsList>
                    {
                        hostingEvents.events.map(event => (
                            <Link
                                key={event.id}
                                href={"/calendar/event/" + event.id}
                            >
                                <EventListItemCard event={event} />
                            </Link>
                        ))
                    }
                </OptionsList>
            ),
        },

        {
            label: `Attending • ${attendingEvents.pagination.totalItems}`,
            value: (
                <OptionsList>
                    {
                        attendingEvents.events.map(event => (
                            <Link
                                key={event.id}
                                href={"/calendar/event/" + event.id}
                            >
                                <EventListItemCard event={event} />
                            </Link>
                        ))
                    }
                </OptionsList>
            ),
        },
    ];

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link
                    href={"/profile"}
                    className={styles.header__avatar}
                >
                    <Avatar image={session?.profile?.picture} />
                </Link>
                <h2 className={styles.header__title}>
                    Today, 7 Sep
                </h2>
                <div className={styles.header__controls}>
                    <Link href={"/calendar/map"}>
                        <IconMap />
                    </Link>
                </div>
            </header>

            <ScrollSection
                title={"Events for today"}
                className={styles.page__gap}
            >
                {
                    todayEvents.events.map(event => (
                        <Link
                            key={event.id}
                            href={"/calendar/event/" + event.id}
                        >
                            <EventCard event={event} />
                        </Link>
                    ))
                }
            </ScrollSection>

            <TabsRoot fitContent>
                <TabsBody
                    controlBefore={
                        <Link href={"/calendar/search"}>
                            <InterestButton
                                icon={<IconSearch />}
                                layout={"icon"}
                            />
                        </Link>
                    }
                    content={tabsContent}
                />
            </TabsRoot>
        </div>
    );
}
