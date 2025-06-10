import { EventVisibility } from "@/entities/event";
import { ComponentType } from "react";

export namespace EventAttendeeViewPage {
    export type Props = {
        type: EventVisibility
    };
}

export async function EventAttendeeViewPage({ type }: EventAttendeeViewPage.Props) {
    let DrawerComponent: ComponentType;

    switch(type) {
        case EventVisibility.PUBLIC:
            DrawerComponent = await import("../modules/event-drawer").then(module => module.EventDrawerPublicView);
            break;
        case EventVisibility.PRIVATE:
            DrawerComponent = await import("../modules/event-drawer").then(module => module.EventDrawerPrivateView);
            break;
        default:
            DrawerComponent = await import("../modules/event-drawer").then(module => module.EventDrawerPrivateView);
    }

    return (
        <DrawerComponent />
    );
}