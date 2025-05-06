import { observable } from "mobx";

export const profileActiveSnap = observable.box(0);
export function setProfileActiveSnap(value: number) {
    profileActiveSnap.set(value);
}