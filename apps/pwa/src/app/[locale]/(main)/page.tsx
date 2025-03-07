"use client";

import { observer } from "mobx-react-lite";
import { MapView } from "@/components/map";
import { mockGeoJsonData } from "@/components/map/mock.data";

export default observer(function Home() {

    return (
        <MapView points={mockGeoJsonData} />
    );
});
