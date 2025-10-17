import { useQuery } from "@tanstack/react-query";
import { GetUserCalendarEventsQuery } from "@/features/calendar/queries";
import { format, startOfToday } from "date-fns";
import { paginationPlaceholder } from "@/entities/placeholders";
import { EventParticipationType } from "@/entities/event";

export function useUpcomingEventsQuery() {
    const { data: upcomingEvents, isFetching: isUpcomingEventsFetching, ...params } = useQuery({
        ...GetUserCalendarEventsQuery({
            startDate: format(startOfToday(), "yyyy-MM-dd"),
        }),
        placeholderData: {
            data: [],
            pagination: paginationPlaceholder,
        },
    });

    return {
        upcomingEvents,
        isUpcomingEventsFetching,
        ...params,
    };
}

export function useHostingEventsQuery() {
    const { data: hostingEvents, isFetching: isHostingEventsFetching, ...params } = useQuery({
        ...GetUserCalendarEventsQuery({
            startDate: format(startOfToday(), "yyyy-MM-dd"),
            participationType: EventParticipationType.HOSTING,
        }),
        placeholderData: {
            data: [],
            pagination: paginationPlaceholder,
        },
    });

    return {
        hostingEvents,
        isHostingEventsFetching,
        ...params,
    };
}

export function useAttendingEventsQuery() {
    const { data: attendingEvents, isFetching: isAttendingEventsFetching, ...params } = useQuery({
        ...GetUserCalendarEventsQuery({
            startDate: format(startOfToday(), "yyyy-MM-dd"),
            participationType: EventParticipationType.ATTENDING,
        }),
        placeholderData: {
            data: [],
            pagination: paginationPlaceholder,
        },
    });

    return {
        attendingEvents,
        isAttendingEventsFetching,
        ...params,
    };
}