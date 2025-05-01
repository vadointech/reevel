import { EventDrawerRoot } from "./root";
import { EventDrawerContent } from "./content";

export namespace EventDrawer {
    export type Props = EventDrawerContent.Data;
}

export const EventDrawer = (data: EventDrawer.Props) => {
    return (
        <EventDrawerRoot>
            <EventDrawerContent {...data} />
        </EventDrawerRoot>
    );
};
