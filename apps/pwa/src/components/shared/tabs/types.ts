import { IMobxStore } from "@/lib/mobx";

export interface ITabsStore extends IMobxStore {
    activeTabIndex: number;
    setActiveTabIndex(tab: number): void;
}

export type TabsContentParams = {
    scrollWidth: number;
    clientWidth: number;
};