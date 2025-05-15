import { MapView } from "@/components/shared/map";
import { PickLocationDrawer } from "@/components/drawers/location";

export default function CreateEventLocationPage() {
    return (
        <>
            <MapView />
            <PickLocationDrawer />
        </>
    );
}