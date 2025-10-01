import { ITabsConfig } from "./types";
import { constructorInit } from "@/lib/init";

export class TabsConfig implements ITabsConfig {
    defaultIndex = 0;
    fitContent = false;

    constructor(init: Partial<ITabsConfig> = {}) {
        constructorInit(this, init);
    }
}