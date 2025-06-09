import { CreateEventFormPage } from "@/flows/create-event/pages";
import { EventVisibility } from "@/entities/event";

export default function Page() {
    return (
        <CreateEventFormPage type={EventVisibility.PRIVATE} />
    );
};