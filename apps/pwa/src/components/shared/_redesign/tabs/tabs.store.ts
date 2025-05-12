import { createMobxStoreProvider, initStore } from "@/lib/mobx";
import { action, makeObservable, observable } from "mobx";

interface ITabsStore {
    activeTabIndex: number;
}

class TabsStore implements ITabsStore {
    activeTabIndex = 0;

    constructor(init: Partial<ITabsStore>) {
        makeObservable(this, {
            activeTabIndex: observable,
            setActiveTabIndex: action,
        });
        initStore(this, init);
    }

    setActiveTabIndex(tab: number) {
        this.activeTabIndex = tab;
    }
}

export const [TabsStoreProvider, useTabsStore] = createMobxStoreProvider(TabsStore);