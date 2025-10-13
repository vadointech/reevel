import { IconCalendarCross, IconMap, IconSearch } from "@/components/icons";

import { Avatar, Button, EventCard, InterestButton, OptionsList, Placeholder } from "@/components/ui";
import { Link } from "@/i18n/routing";

import { ScrollSection } from "@/components/sections";
import { TabsBody, TabsRoot } from "@/components/shared/tabs";
import { EventListItemCard } from "@/components/ui";
import { getSession } from "@/api/user/server";
import { CreateEventDrawer } from "@/components/drawers/create-event";

import { getUserCalendarEvents } from "@/api/calendar/server";

import { format, startOfToday, endOfToday } from "date-fns";
import { EventParticipationType } from "@/entities/event";

import styles from "../styles/calendar-page.module.scss";

export namespace CalendarPage {
    export type Props = never;
}

export async function CalendarPage() {
    const user = await getSession();

    const today = format(new Date(), "d MMM");

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
                        upcomingEvents.events.length === 0 ? (
                            <Placeholder
                                size={"small"}
                                icon={<IconCalendarCross />}
                                title={"No upcoming events"}
                                description={"Create one and plan ahead"}
                            >
                                <Button
                                    size={"xsmall"}
                                    href={"/discover"}
                                    variant={"secondary-muted"}
                                    className={styles.no__cta}
                                >
                                    Discover events
                                </Button>
                            </Placeholder>
                        ) : upcomingEvents.events.map(event => (
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
                        hostingEvents.events.length === 0 ? (
                            <Placeholder
                                size={"small"}
                                icon={<IconCalendarCross />}
                                title={"You’re not hosting anything"}
                                description={"Create an event and invite others"}
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
                        ) : hostingEvents.events.map(event => (
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
                        attendingEvents.events.length === 0 ? (
                            <Placeholder
                                size={"small"}
                                icon={<IconCalendarCross />}
                                title={"You’re not attending any events"}
                                description={"Find something that interests you and join in!"}
                            >
                                <Button
                                    size={"xsmall"}
                                    href={"/discover"}
                                    variant={"secondary-muted"}
                                    className={styles.no__cta}
                                >
                                    Discover events
                                </Button>
                            </Placeholder>
                        ) : attendingEvents.events.map(event => (
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
                    <Avatar image={user?.profile?.picture} />
                </Link>
                <h2 className={styles.header__title}>
                    Today, { today }
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
                    todayEvents.events.length === 0 ? (
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
                    ) : todayEvents.events.map(event => (
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
