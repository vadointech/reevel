"use client";

import {
    SearchScreen,
    SearchScreenContent,
    SearchScreenMotionContent, SearchScreenMotionListContent,
    SearchScreenSearchBar,
} from "@/components/screens/search";
import { Section } from "@/components/sections";
import { EventListItemCard, OptionsList } from "@/components/ui";
import { DiscoverStaticCollections } from "@/features/discover/config";
import Link from "next/link";
import { EventEntity } from "@/entities/event";
import { useCalendarContext } from "@/features/calendar";
import { observer } from "mobx-react-lite";
import { AnimatePresence } from "motion/react";
import { useMotionRef } from "@/lib/motion";
import { useCalendarEventsSearch } from "@/features/calendar/hooks";

export namespace CalendarSearchScreen {
    export type RecommendationListProps = {
        upcomingEvents: EventEntity[];
        hostingEvents: EventEntity[];
        attendingEvents: EventEntity[];
    };
    export type Props = RecommendationListProps;
}

export const CalendarSearchScreen = ({
    upcomingEvents,
    hostingEvents,
    attendingEvents,
}: CalendarSearchScreen.Props) => {
    const { handleSetSearchTerm } = useCalendarEventsSearch();

    return (
        <SearchScreen>
            <SearchScreenSearchBar
                controlHref={"/calendar"}
                onChange={handleSetSearchTerm}
            />
            <SearchScreenContent>
                {
                    upcomingEvents.length > 0 && (
                        <RecommendationList
                            upcomingEvents={upcomingEvents}
                            hostingEvents={hostingEvents}
                            attendingEvents={attendingEvents}
                        />
                    )
                }

                <SearchResultsList />
            </SearchScreenContent>
        </SearchScreen>
    );
};

const RecommendationList = observer(({
    upcomingEvents,
    hostingEvents,
    attendingEvents,
}: CalendarSearchScreen.RecommendationListProps) => {
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
            {
                upcomingEvents.length > 0 && (
                    <Section title={"Upcoming"}>
                        <OptionsList>
                            {
                                upcomingEvents.map(event => (
                                    <Link
                                        key={event.id}
                                        href={DiscoverStaticCollections.Root + "/event/" + event.id}
                                    >
                                        <EventListItemCard event={event} />
                                    </Link>
                                ))
                            }
                        </OptionsList>
                    </Section>
                )
            }

            {
                hostingEvents.length > 0 && (
                    <Section title={"Hosting"}>
                        <OptionsList>
                            {
                                hostingEvents.map(event => (
                                    <Link
                                        key={event.id}
                                        href={DiscoverStaticCollections.Root + "/event/" + event.id}
                                    >
                                        <EventListItemCard event={event} />
                                    </Link>
                                ))
                            }
                        </OptionsList>
                    </Section>
                )
            }

            {
                attendingEvents.length > 0 && (
                    <Section title={"Attending"}>
                        <OptionsList>
                            {
                                attendingEvents.map(event => (
                                    <Link
                                        key={event.id}
                                        href={DiscoverStaticCollections.Root + "/event/" + event.id}
                                    >
                                        <EventListItemCard event={event} />
                                    </Link>
                                ))
                            }
                        </OptionsList>
                    </Section>
                )
            }
        </SearchScreenMotionContent>
    );
});

const SearchResultsList = observer(() => {
    const calendar = useCalendarContext();
    const visible = calendar.store.searchResults !== null;

    return (
        <AnimatePresence>
            {
                visible && (
                    <SearchScreenMotionListContent>
                        <Section title={"Upcoming"}>
                            <OptionsList>
                                {
                                    calendar.store.searchResults?.map(event => (
                                        <Link
                                            key={event.id}
                                            href={DiscoverStaticCollections.Root + "/event/" + event.id}
                                        >
                                            <EventListItemCard event={event} />
                                        </Link>
                                    ))
                                }
                            </OptionsList>
                        </Section>
                    </SearchScreenMotionListContent>
                )
            }
        </AnimatePresence>
    );
});
