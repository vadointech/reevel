import { PropsWithChildren } from "react";
import { Navigation, NavigationRoutes } from "@/components/shared/navigation";
import { CalendarProvider } from "@/features/calendar";

export namespace CalendarRootLayout {
    export type Props = PropsWithChildren;
}

export function CalendarRootLayout({ children }: CalendarRootLayout.Props) {
    return (
        <CalendarProvider>
            { children }
            <Navigation currentPage={NavigationRoutes.Calendar} />
        </CalendarProvider>
    );
}