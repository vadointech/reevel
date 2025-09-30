import { PropsWithChildren } from "react";
import { Navigation, NavigationRoutes } from "@/components/shared/navigation";

export namespace CalendarRootLayout {
    export type Props = PropsWithChildren;
}

export function CalendarRootLayout({ children }: CalendarRootLayout.Props) {
    return (
        <>
            { children }
            <Navigation currentPage={NavigationRoutes.Calendar} />
        </>
    );
}