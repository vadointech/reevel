import { PropsWithChildren } from "react";
import { CalendarMapViewLayout } from "@/flows/calendar/layouts";

export default function Layout(props: PropsWithChildren) {
    return <CalendarMapViewLayout {...props} />;
}