import { useCallback, useRef } from "react";
import { useCalendarContext } from "../calendar.context";
import { RequestDebouncer } from "@/lib/debouncer";
import { useQueryClient } from "@tanstack/react-query";
import { SearchCalendarEventsQuery } from "@/features/calendar/queries";

export function useCalendarEventsSearch() {
    const calendar = useCalendarContext();
    const debouncer = useRef(new RequestDebouncer());
    const queryClient = useQueryClient();

    const handleSearch = useCallback((searchTerm: string) => {
        return debouncer.current.debounceRequest(async() => {
            if(searchTerm.length > 2) {
                return queryClient.fetchQuery(
                    SearchCalendarEventsQuery(
                        searchTerm.toLowerCase(),
                    ),
                );
            } else {
                return null;
            }
        }, 700);
    }, []);

    const setSearchResults = useCallback((results: SearchCalendarEventsQuery.TOutput | null) => {
        if(results === null) {
            calendar.store.setSearchResults(null);
        } else {
            calendar.store.setSearchResults(results.events);
        }
    }, []);

    const handleSetSearchTerm = useCallback((searchTerm: string) => {
        handleSearch(searchTerm).then(setSearchResults);
    }, [handleSearch, setSearchResults]);

    return {
        handleSetSearchTerm,
    };
}