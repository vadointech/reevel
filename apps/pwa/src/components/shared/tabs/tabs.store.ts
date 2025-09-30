import { constructorInit } from "@/lib/init";
import { action, makeObservable, observable } from "mobx";

import { ITabsStore } from "./types";

export class TabsStore implements ITabsStore {
    activeTabIndex = 0;

    constructor(init: Partial<ITabsStore>) {
        constructorInit(this, init);
        makeObservable(this, {
            activeTabIndex: observable,
            setActiveTabIndex: action,
        });
    }

    dispose() {}

    setActiveTabIndex(tab: number) {
        this.activeTabIndex = tab;
    }
}