import { EventVisibility } from "@/entities/event";
import { ComponentType } from "react";

export namespace EventHostViewPage {
    export type Props = {
        type: EventVisibility
    };
}

export async function EventHostViewPage({ type }: EventHostViewPage.Props) {
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