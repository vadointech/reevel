"use client";

import { memo, PropsWithChildren } from "react";
import Link from "next/link";

import {
    BottomSheetBody,
    BottomSheetContent,
    BottomSheetHandle,
    BottomSheetPortal,
    BottomSheetRoot,
    BottomSheetScrollable,
} from "@/components/shared/bottom-sheet";

import { Carousel } from "@/components/shared/carousel";
import {
    Button,
    EventListItemCard,
    EventListItemCardSkeleton,
    Header,
    InterestButton,
    OptionsList,
    Placeholder,
} from "@/components/ui";
import { IconArrowLeft, IconCalendarCross, IconSearch } from "@/components/icons";

import { EventParticipationType } from "@/entities/event";

import styles from "./styles.module.scss";
import { observer } from "mobx-react-lite";
import { useCalendarContext } from "@/features/calendar";
import { useQuery } from "@tanstack/react-query";
import { GetUserCalendarEventsQuery } from "@/features/calendar/queries";
import { format, startOfToday } from "date-fns";
import { paginationPlaceholder } from "@/entities/placeholders";
import { useUpcomingEventsQuery } from "@/features/calendar/hooks";

export namespace CalendarMapViewDrawer {
    export type Props = PropsWithChildren<{
        handleSelectParticipationType: (type: EventParticipationType | null) => void;
    }>;

    export type TabButtonProps = {
        onSelect: (type: EventParticipationType | null) => void;
    };

    export type ParticipationTypeButtonProps = PropsWithChildren<TabButtonProps & {
        type: EventParticipationType | null;
        cont?: number;
    }>;
}

export const CalendarMapViewDrawer = memo(({
    children,
    handleSelectParticipationType,
}: CalendarMapViewDrawer.Props) => {
    return (
        <BottomSheetRoot
            defaultOpen
            touchEvents
            dismissible={false}
            snapPoints={[.95, .5, .18]}
            fadeThreshold={.6}
            defaultSnapPointIndex={2}
        >
            <BottomSheetPortal>
                <BottomSheetBody style={{ height: "100%" }} >
                    <div
                        className={styles.drawer__scroll}
                        style={{ position: "relative", height: 38 }}
                    >
                        <Carousel>
                            <Link href={"/calendar/search"}>
                                <InterestButton
                                    icon={<IconSearch />}
                                    layout={"icon"}
                                />
                            </Link>
                            <HostingTabButton onSelect={handleSelectParticipationType} />
                            <AttendingButton onSelect={handleSelectParticipationType} />
                        </Carousel>
                    </div>
                    <BottomSheetContent>
                        <BottomSheetHandle className={styles.drawer__handle}>
                            <Header
                                size={"large"}
                                iconBefore={
                                    <Link href={"/calendar"}>
                                        <IconArrowLeft />
                                    </Link>
                                }
                            >
                                { children }
                            </Header>
                        </BottomSheetHandle>
                        <BottomSheetScrollable className={styles.drawer__list}>
                            <EventList />
                        </BottomSheetScrollable>
                    </BottomSheetContent>
                </BottomSheetBody>
            </BottomSheetPortal>
        </BottomSheetRoot>
    );
});

const EventList = observer(() => {
    const { upcomingEvents, isUpcomingEventsFetching } = useUpcomingEventsQuery();

    if(isUpcomingEventsFetching) {
        return (
            <OptionsList>
                <OptionsList>
                    {
                        [...new Array(3).keys()].map((item) => (
                            <EventListItemCardSkeleton key={`event-card-skeleton-${item}`} />
                        ))
                    }
                </OptionsList>
            </OptionsList>
        );
    }

    if(!upcomingEvents || upcomingEvents.pagination.totalItems === 0) {
        return (
            <OptionsList>
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
            </OptionsList>
        );
    }

    return (
        <OptionsList>
            {
                upcomingEvents.data.map((event) => (
                    <Link
                        key={event.id}
                        href={`/discover/event/${event.id}`}
                    >
                        <EventListItemCard event={event} />
                    </Link>
                ))
            }
        </OptionsList>
    );
});

const HostingTabButton = ({ onSelect }: CalendarMapViewDrawer.TabButtonProps) => {
    const { data: hostingEvents } = useQuery({
        ...GetUserCalendarEventsQuery({
            startDate: format(startOfToday(), "yyyy-MM-dd"),
            participationType: EventParticipationType.HOSTING,
        }),
        placeholderData: {
            data: [],
            pagination: paginationPlaceholder,
        },
    });
  
    return (
        <ParticipationTypeButton
            type={EventParticipationType.HOSTING}
            cont={hostingEvents?.pagination.totalItems}
            onSelect={onSelect}
        >
            Hosting
        </ParticipationTypeButton>
    );
};

const AttendingButton = ({ onSelect }: CalendarMapViewDrawer.TabButtonProps) => {
    const { data: attendingEvents } = useQuery({
        ...GetUserCalendarEventsQuery({
            startDate: format(startOfToday(), "yyyy-MM-dd"),
            participationType: EventParticipationType.ATTENDING,
        }),
        placeholderData: {
            data: [],
            pagination: paginationPlaceholder,
        },
    });

    return (
        <ParticipationTypeButton
            type={EventParticipationType.ATTENDING}
            cont={attendingEvents?.pagination.totalItems}
            onSelect={onSelect}
        >
            Attending
        </ParticipationTypeButton>
    );
};

const ParticipationTypeButton = observer(({
    type,
    cont,
    children,
    onSelect,
}: CalendarMapViewDrawer.ParticipationTypeButtonProps) => {
    const calendar = useCalendarContext();

    return (
        <InterestButton
            variant={
                calendar.store.participationType === type ? "primary" : "default"
            }
            onClick={() => onSelect(type)}
        >
            { children } • { cont || 0 }
        </InterestButton>
    );
});
