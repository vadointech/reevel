
import { TabsBody, TabsRoot } from "@/components/shared/tabs";
import { Link } from "@/i18n/routing";
import {
    Button,
    EventListItemCard,
    EventListItemCardSkeleton,
    InterestButton,
    OptionsList,
    Placeholder,
} from "@/components/ui";
import { IconCalendarCross, IconSearch } from "@/components/icons";
import { CreateEventDrawer } from "@/components/drawers/create-event";

import styles from "../styles/calendar-page.module.scss";
import { ReactNode, useRef } from "react";
import {
    useAttendingEventsQuery,
    useHostingEventsQuery,
    useUpcomingEventsQuery,
} from "@/features/calendar/hooks";

export namespace CalendarEventCategoryTabs {
    export type Props = never;
}
enum TabSections {
    UPCOMING = "UPCOMING",
    HOSTING = "HOSTING",
    ATTENDING = "ATTENDING",
}

export const CalendarEventCategoryTabs = () => {
    const { upcomingEvents, isUpcomingEventsFetching } = useUpcomingEventsQuery();
    const { hostingEvents, isHostingEventsFetching } = useHostingEventsQuery();
    const { attendingEvents, isAttendingEventsFetching } = useAttendingEventsQuery();
  
    const tabsContent = useRef<Map<TabSections, ReactNode>>(
        new Map([
            [TabSections.UPCOMING, <TabsContentSkeleton />],
            [TabSections.HOSTING, <TabsContentSkeleton />],
            [TabSections.ATTENDING, <TabsContentSkeleton />],
        ]),
    );


    if(!isUpcomingEventsFetching && upcomingEvents) {
        if(upcomingEvents.pagination.totalItems === 0) {
            tabsContent.current.set(
                TabSections.UPCOMING,
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
                </Placeholder>,
            );
        } else {
            tabsContent.current.set(
                TabSections.UPCOMING,
                upcomingEvents.data.map(event => (
                    <Link
                        key={event.id}
                        href={"/calendar/event/" + event.id}
                    >
                        <EventListItemCard event={event} />
                    </Link>
                )),
            );
        }
    }

    if(!isHostingEventsFetching && hostingEvents) {
        if(hostingEvents.pagination.totalItems === 0) {
            tabsContent.current.set(
                TabSections.HOSTING,
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
                </Placeholder>,
            );
        } else {
            tabsContent.current.set(
                TabSections.HOSTING,
                hostingEvents.data.map(event => (
                    <Link
                        key={event.id}
                        href={"/calendar/event/" + event.id}
                    >
                        <EventListItemCard event={event} />
                    </Link>
                )),
            );
        }
    }

    if(!isAttendingEventsFetching && attendingEvents) {
        if(attendingEvents.pagination.totalItems === 0) {
            tabsContent.current.set(
                TabSections.ATTENDING,
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
                </Placeholder>,
            );
        } else {
            tabsContent.current.set(
                TabSections.ATTENDING,
                attendingEvents.data.map(event => (
                    <Link
                        key={event.id}
                        href={"/calendar/event/" + event.id}
                    >
                        <EventListItemCard event={event} />
                    </Link>
                )),
            );
        }
    }

    return (
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
                content={[
                    {
                        label: `Upcoming • ${upcomingEvents?.pagination.totalItems}`,
                        value: (
                            <OptionsList>
                                { tabsContent.current.get(TabSections.UPCOMING) }
                            </OptionsList>
                        ),
                    },

                    {
                        label: `Hosting • ${hostingEvents?.pagination.totalItems}`,
                        value: (
                            <OptionsList>
                                { tabsContent.current.get(TabSections.HOSTING) }
                            </OptionsList>
                        ),
                    },

                    {
                        label: `Attending • ${attendingEvents?.pagination.totalItems}`,
                        value: (
                            <OptionsList>
                                { tabsContent.current.get(TabSections.ATTENDING) }
                            </OptionsList>
                        ),
                    },
                ]}
            />
        </TabsRoot>
    );
};

const TabsContentSkeleton = () => {
    return [...new Array(2).keys()].map((item) => (
        <EventListItemCardSkeleton key={`event-card-skeleton-${item}`} />
    ));
};