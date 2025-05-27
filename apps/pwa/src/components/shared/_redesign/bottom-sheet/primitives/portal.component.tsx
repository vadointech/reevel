"use client";

import ReactDOM from "react-dom";
import { PropsWithChildren } from "react";
import { observer } from "mobx-react-lite";

import { useQuerySelectorContext } from "@/providers/query-selector.provider";
import { useBottomSheet } from "@/components/shared/_redesign/bottom-sheet";
import { AnimatePresence } from "motion/react";

export namespace BottomSheetPortal {
    export type Props = PropsWithChildren;
}

export const BottomSheetPortal = observer(({ children }: BottomSheetPortal.Props) => {
    const { modal, main } = useQuerySelectorContext();
    const { store, controller } = useBottomSheet();

    if(!modal.current) return null;

    const handleExitComplete = () => {
        if (main.current && !controller.current.internalConfig.touchEvents) {
            main.current.style.pointerEvents = "";
        }
    };

    if(store.open) {
        if(main.current && !controller.current.internalConfig.touchEvents) {
            main.current.style.pointerEvents = "none";
        }
    }

    return ReactDOM.createPortal(
        <AnimatePresence onExitComplete={handleExitComplete}>
            {
                store.open && children
            }
        </AnimatePresence>,
        modal.current,
    );
});