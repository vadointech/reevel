import { action, observable } from "mobx";

export const activeSnapPoint = observable.box(0);
export const setActiveSnapPoint = action((value: number) => {
    activeSnapPoint.set(value);
});