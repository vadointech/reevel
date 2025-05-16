"use client";

import { PropsWithChildren } from "react";

import { observer } from "mobx-react-lite";
import { AnimatePresence } from "motion/react";

import { useBottomSheetStore } from "../store";
import { useQuerySelectorContext } from "@/providers/query-selector.provider";

export namespace BottomSheetBody {
    export type Props = PropsWithChildren;
}

export const BottomSheetBody = observer(({
    children,
}: BottomSheetBody.Props) => {
    const bottomSheetStore = useBottomSheetStore();
    const { main } = useQuerySelectorContext();
    const handleExit = () => {
        if (main.current) {
            main.current.style.pointerEvents = "";
        }
    };

    if(bottomSheetStore.open) {
        if(main.current) {
            main.current.style.pointerEvents = "none";
        }
    }

    return (
        <AnimatePresence onExitComplete={handleExit}>
            {
                bottomSheetStore.open && children
            }
        </AnimatePresence>
    );
});
