import { StartDrawer } from "@/components/drawers/start-drawer";
import { EventDrawer } from "@/components/shared/event-drawer";
import { MapView } from "@/components/shared/map";
import { BasePoint, Point } from "@/components/shared/map/types";

export default function Home() {
    return (
        <>
            <MapView
            />
            <EventDrawer open={true} />
        </>
    );
}