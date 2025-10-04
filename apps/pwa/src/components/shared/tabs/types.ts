import { IMobxStore } from "@/lib/mobx";

export interface ITabsStore extends IMobxStore {
    activeTabIndex: number;
    setActiveTabIndex(tab: number): void;
}

export interface ITabsConfig {
    defaultIndex: number;
    fitContent: boolean;
}

export type TabsContentParams = {
    scrollWidth: number;
    clientWidth: number;
};