"use client";

import { InterestEntity } from "@/entities/interests";
import { createMobxStoreProvider, initStore } from "@/lib/mobx";
import { action, makeObservable, observable } from "mobx";


export interface IProfileSettingsStore {

}

class ProfileSettingsStore implements IProfileSettingsStore {


    constructor(init?: Partial<IProfileSettingsStore>) {
        makeObservable(this, {

        });

        initStore(this, init);
    }


}

export const [ProfileSettingsStoreProvider, useProfileSettingsStore] = createMobxStoreProvider(ProfileSettingsStore);