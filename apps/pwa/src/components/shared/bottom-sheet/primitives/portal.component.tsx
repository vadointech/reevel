"use client";

import ReactDOM from "react-dom";
import { PropsWithChildren, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useQuerySelectorContext } from "@/providers/query-selector.provider";
import { useBottomSheet } from "@/components/shared/bottom-sheet";
import { AnimatePresence } from "motion/react";

export namespace BottomSheetPortal {
    export type Props = PropsWithChildren;
}

export const BottomSheetPortal = observer(({ children }: BottomSheetPortal.Props) => {
    const { modal, main } = useQuerySelectorContext();
    const { store, controller } = useBottomSheet();

    const handleExitComplete = () => {
        if(main.current) {
            main.current.style.overflow = "";
            main.current.style.pointerEvents = "";
        }
    };

    useEffect(() => {
        return () => handleExitComplete();
    }, []);

    if(!modal.current) return null;

    if(store.open) {
        if(main.current) {
            main.current.style.overflow = "hidden";
            if(!controller.current.internalConfig.touchEvents) {
                main.current.style.pointerEvents = "none";
            }
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