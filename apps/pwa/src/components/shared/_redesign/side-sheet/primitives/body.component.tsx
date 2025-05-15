"use client";

import { PropsWithChildren } from "react";

import { observer } from "mobx-react-lite";
import { AnimatePresence } from "motion/react";

import { useSideSheetStore } from "../store";

export namespace SideSheetBody {
    export type Props = PropsWithChildren;
}

export const SideSheetBody = observer(({
    children,
}: SideSheetBody.Props) => {
    const sideSheetStore = useSideSheetStore();

    return (
        <AnimatePresence>
            {
                sideSheetStore.open && children
            }
        </AnimatePresence>
    );
});
