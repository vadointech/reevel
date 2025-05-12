"use client";

import { PropsWithChildren } from "react";

import { observer } from "mobx-react-lite";
import { AnimatePresence } from "motion/react";

import { useBottomSheetStore } from "../store";

export namespace BottomSheetBody {
    export type Props = PropsWithChildren;
}

export const BottomSheetBody = observer(({
    children,
}: BottomSheetBody.Props) => {
    const bottomSheetStore = useBottomSheetStore();

    return (
        <AnimatePresence>
            {
                bottomSheetStore.open && children
            }
        </AnimatePresence>
    );
});
