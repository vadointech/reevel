"use client";

import styles from "../styles/calendar-search-page.module.scss";
import {
    SearchScreen,
    SearchScreenContent,
    SearchScreenMotionListContent,
    SearchScreenSearchBar,
} from "@/components/screens/search";
import { observer } from "mobx-react-lite";
import { useCalendarContext } from "@/features/calendar";
import { Section } from "@/components/sections";
import { EventListItemCard, OptionsList, Placeholder } from "@/components/ui";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { IconSearchCross } from "@/components/icons";
import { useCalendarEventsSearch } from "@/features/calendar/hooks";
import { CalendarSearchRecommendations } from "@/flows/calendar/components";

export namespace CalendarSearchPage {
    export type Props = never;
}

export function CalendarSearchPage() {
    const { handleSetSearchTerm } = useCalendarEventsSearch();
  
    return (
        <div className={styles.page}>
            <SearchScreen>
                <SearchScreenSearchBar
                    controlHref={"/calendar"}
                    onChange={handleSetSearchTerm}
                />
                <SearchScreenContent>
                    <CalendarSearchRecommendations />
                    <SearchResultsList />
                </SearchScreenContent>
            </SearchScreen>
        </div>
    );
}

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
                                    calendar.store.searchResults?.length === 0 ? (
                                        <Placeholder
                                            title={"No results found"}
                                            icon={<IconSearchCross />}
                                            description={"Try a different keyword"}
                                        />
                                    ) : calendar.store.searchResults?.map(event => (
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
                    </SearchScreenMotionListContent>
                )
            }
        </AnimatePresence>
    );
});
