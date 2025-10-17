"use client";

import { SearchScreenMotionContent } from "@/components/screens/search";
import { useCalendarContext } from "@/features/calendar";
import { useMotionRef } from "@/lib/motion";
import { Section, SectionSkeleton } from "@/components/sections";
import { EventListItemCard, EventListItemCardSkeleton, OptionsList } from "@/components/ui";
import { Link } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import { GetUserCalendarEventsQuery } from "@/features/calendar/queries";
import { format, startOfToday } from "date-fns";
import { paginationPlaceholder } from "@/entities/placeholders";
import { EventEntity, EventParticipationType } from "@/entities/event";
import { observer } from "mobx-react-lite";

export namespace CalendarSearchRecommendations {
    export type ListProps = {
        title: string;
        data: EventEntity[] | undefined;
        loading: boolean;
    };
    export type Props = never;
}

export const CalendarSearchRecommendations = observer(() => {
    const calendar = useCalendarContext();
    const visible = calendar.store.searchResults === null;

    const params = useMotionRef<HTMLDivElement>(visible, (val, animate) => {
        if(val) {
            animate.start({
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
            });
        } else {
            animate.start({
                opacity: 0,
                scale: 0.96,
                y: -10,
                filter: "blur(6px)",
            });
        }
    });

    return (
        <SearchScreenMotionContent {...params}>
            <UpcomingEvents />
            <HostingEvents />
            <AttendingEvents />
        </SearchScreenMotionContent>
    );
});

const UpcomingEvents = () => {
    const { data: upcomingEvents, isFetching } = useQuery({
        ...GetUserCalendarEventsQuery({
            startDate: format(startOfToday(), "yyyy-MM-dd"),
        }),
        placeholderData: {
            data: [],
            pagination: paginationPlaceholder,
        },
    });

    return <RecommendationList title={"Upcoming"} data={upcomingEvents?.data} loading={isFetching} />;
};

const HostingEvents = () => {
    const { data: hostingEvents, isFetching } = useQuery({
        ...GetUserCalendarEventsQuery({
            startDate: format(startOfToday(), "yyyy-MM-dd"),
            participationType: EventParticipationType.HOSTING,
        }),
        placeholderData: {
            data: [],
            pagination: paginationPlaceholder,
        },
    });

    return <RecommendationList title={"Hosting"} data={hostingEvents?.data} loading={isFetching} />;
};

const AttendingEvents = () => {
    const { data: attendingEvents, isFetching } = useQuery({
        ...GetUserCalendarEventsQuery({
            startDate: format(startOfToday(), "yyyy-MM-dd"),
            participationType: EventParticipationType.ATTENDING,
        }),
        placeholderData: {
            data: [],
            pagination: paginationPlaceholder,
        },
    });

    return <RecommendationList title={"Hosting"} data={attendingEvents?.data} loading={isFetching} />;
};


const RecommendationList = ({
    title,
    loading,
    data,
}: CalendarSearchRecommendations.ListProps) => {
    if(loading) {
        return (
            <SectionSkeleton>
                <OptionsList>
                    {
                        [...new Array(2).keys()].map((item) => (
                            <EventListItemCardSkeleton key={`${title}-event-card-skeleton-${item}`} />
                        ))
                    }
                </OptionsList>
            </SectionSkeleton>
        );
    }

    if(data && data.length > 0) {
        return (
            <Section title={title}>
                <OptionsList>
                    {
                        data.map(event => (
                            <Link
                                key={event.id}
                                href={"/calendar/event/" + event.id}
                            >
                                <EventListItemCard event={event} />
                            </Link>
                        ))
                    }
                </OptionsList>
            </Section>
        );
    }

    return null;
};