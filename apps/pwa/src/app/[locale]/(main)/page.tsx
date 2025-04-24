import { EventDrawer } from "@/components/drawers/event-drawer";
import { sampleEvent } from "@/components/drawers/event-drawer/mock.data";
import { MapView } from "@/components/shared/map";

const data = sampleEvent

export default function Home() {
    return (
        <>
            <MapView
            />
            <EventDrawer data={data} open={true} />
        </>
    );
}