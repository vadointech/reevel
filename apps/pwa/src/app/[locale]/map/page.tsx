import { Map } from "@/components/map";

export default function Page() {

    return (
        <Map
            accessToken={process.env.MAPBOX_ACESS_TOKEN}
            mapStyle={process.env.MAPBOX_MAP_STYLE}
        />
    );
}