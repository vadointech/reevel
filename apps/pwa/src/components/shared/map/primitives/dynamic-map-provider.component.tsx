"use client";

import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { MapConfig } from "@/components/shared/map/types";

const PersistentMapProvider = dynamic(
    () => import("./map-provider.component").then(module => module.PersistentMapProvider),
    {
        ssr: false,
        loading: () => <>Loading...</>,
    },
);
export const DynamicMapProvider = (props: PropsWithChildren<MapConfig.Params>) => {
    return <PersistentMapProvider {...props} />;
};