import { createMobxStoreProvider } from "@/lib/mobx";
import { action, makeObservable, observable } from "mobx";

class SideSheetStore {
    open: boolean = false;

    constructor() {
        makeObservable(this, {
            open: observable,
            setOpen: action,
            setClose: action,
        });
    }

    setOpen() {
        this.open = true;
    }

    setClose() {
        this.open = false;
    }
}

export const [SideSheetStoreProvider, useSideSheetStore] = createMobxStoreProvider(SideSheetStore);