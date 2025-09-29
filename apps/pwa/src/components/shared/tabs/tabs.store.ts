import { constructorInit } from "@/lib/init";
import { createMobxStoreProvider } from "@/lib/mobx";
import { action, makeObservable, observable } from "mobx";

interface ITabsStore {
    activeTabIndex: number;
}

class TabsStore implements ITabsStore {
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

export const [TabsStoreProvider, useTabsStore] = createMobxStoreProvider(TabsStore);