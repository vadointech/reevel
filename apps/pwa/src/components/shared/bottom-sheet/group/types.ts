import { IBottomSheetRootController } from "../types";
import { IMobxStore } from "@/lib/mobx";

export type BottomSheetControllersGroup<T extends string = string> = {
    [key in T]?: IBottomSheetRootController
};