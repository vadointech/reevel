"use client";

import { makeObservable } from "mobx";
import { createMobxStoreProvider } from "@/lib/mobx";

class ProfileSettingsStore {

    constructor() {
        makeObservable(this, {

        });

    }

    dispose() {}
}

export const [ProfileSettingsStoreProvider, useProfileSettingsStore] = createMobxStoreProvider(ProfileSettingsStore);