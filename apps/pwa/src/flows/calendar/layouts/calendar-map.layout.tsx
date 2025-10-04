import { MapView } from "@/components/shared/map";
import { PropsWithChildren } from "react";
import { eventEntityMapper } from "@/entities/event/mapper";
import { getUserCalendarEvents } from "@/api/calendar/server";
import { format, startOfToday } from "date-fns";

export namespace CalendarMapLayout {
    export type Props = PropsWithChildren;
}

export async function CalendarMapViewLayout({ children }: CalendarMapLayout.Props) {
    const upcomingEvents = await getUserCalendarEvents({
        startDate: format(startOfToday(), "yyyy-MM-dd"),
    });
    const points = eventEntityMapper.toEventPoint(upcomingEvents.events);

    return (
        <>
            <MapView
                viewState={{
                    padding: {
                        bottom: 260,
                    },
                }}
                points={points}
            />
            { children }
        </>
    );
}
