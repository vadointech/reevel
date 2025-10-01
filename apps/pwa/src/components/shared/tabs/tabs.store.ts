import { action, makeObservable, observable } from "mobx";

import { ITabsConfig, ITabsStore } from "./types";

export class TabsStore implements ITabsStore {
    activeTabIndex = 0;

    constructor(config: ITabsConfig) {
        this.activeTabIndex = config.defaultIndex;

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