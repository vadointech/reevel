import { EventAttendeeViewPage } from "@/flows/event-view/pages";
import { EventVisibility } from "@/entities/event";

export default function Page() {
    return <EventAttendeeViewPage type={EventVisibility.PUBLIC} />;
}