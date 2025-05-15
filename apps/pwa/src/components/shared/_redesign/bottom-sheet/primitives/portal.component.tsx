"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { AnimatePresence } from "motion/react";
import { useBottomSheetStore } from "../store";

import { useQuerySelectorContext } from "@/providers/query-selector.provider";

export namespace BottomSheetPortal {
    export type Props = PropsWithChildren;
}

export const BottomSheetPortal = observer(({ children }: BottomSheetPortal.Props) => {
    const { modal, main } = useQuerySelectorContext();
    const bottomSheetStore = useBottomSheetStore();
    const rootConfig = bottomSheetStore.rootConfig;

    const [, setMounted] = useState(false);

    useEffect(() => {
        if(!modal.current) {
            modal.current = document.getElementById("modal-root");
            setMounted(true);
        }
    }, []);

    if(!modal.current) return null;

    const handleExit = () => {
        if (main.current && !rootConfig.touchEvents) {
            main.current.style.pointerEvents = "";
        }
    };

    if(bottomSheetStore.open) {
        if(main.current && !rootConfig.touchEvents) {
            main.current.style.pointerEvents = "none";
        }
    }

    return ReactDOM.createPortal(
        <AnimatePresence onExitComplete={handleExit}>
            {
                bottomSheetStore.open && children
            }
        </AnimatePresence>,
        modal.current,
    );
});