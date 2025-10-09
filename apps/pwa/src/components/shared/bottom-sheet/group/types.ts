import { IBottomSheetRootController } from "../types";

export type BottomSheetControllersGroup<T extends string = string> = {
    [key in T]?: IBottomSheetRootController
};