import { MapView } from "@/components/shared/map";
import { PropsWithChildren } from "react";
import { CalendarProvider } from "@/features/calendar";

export namespace CalendarMapLayout {
    export type Props = PropsWithChildren;
}

export async function CalendarMapViewLayout({ children }: CalendarMapLayout.Props) {
    return (
        <CalendarProvider>
            <MapView />
            { children }
        </CalendarProvider>
    );
}
