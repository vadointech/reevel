import { StartDrawer } from "@/components/drawers/start-drawer";
import { EventDrawer } from "@/components/shared/event-drawer";
import { MapView } from "@/components/shared/map";

export default function Home() {
    return (
        <>
            <MapView
            />
            <EventDrawer />
        </>
    );
}