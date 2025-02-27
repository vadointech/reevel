"use client";

import { createMobxStoreProvider } from "@/lib/mobx-store.provider";
import { MapStore } from "./map.store";

export const [MapStoreProvider, useMapStore] = createMobxStoreProvider(MapStore);