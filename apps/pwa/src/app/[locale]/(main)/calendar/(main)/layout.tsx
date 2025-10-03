import { PropsWithChildren } from "react";
import { CalendarRootLayout } from "@/flows/calendar/layouts";

export default function Layout(props: PropsWithChildren) {
    return <CalendarRootLayout {...props} />;
}