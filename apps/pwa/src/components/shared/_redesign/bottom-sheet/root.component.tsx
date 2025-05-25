"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";
import { useAnimation } from "motion/react";

import { BottomSheetRootConfig } from "./config/root.config";
import { BottomSheetContext } from "./bottom-sheet.context";
import { BottomSheetRootController } from "./controllers";
import { BottomSheetStore } from "./store";

import { IBottomSheetConfigParams, BottomSheetExternalController } from "./types";

export namespace BottomSheetRoot {
    export type Props = Partial<IBottomSheetConfigParams> & {
        children: ReactNode;
        externalController?: BottomSheetExternalController;
    };
}

export const BottomSheetRoot = ({
    children,
    externalController,
    ...configProps
}: BottomSheetRoot.Props) => {
    const animationControls = useAnimation();

    const rootConfig = new BottomSheetRootConfig({
        ...configProps,
    });

    const store = useMemo(() => new BottomSheetStore(rootConfig), []);

    const controller = useRef(
        new BottomSheetRootController(
            rootConfig,
            store,
            animationControls,
        ),
    );

    useEffect(() => {
        if(externalController) {
            externalController.current = controller.current;
        }
    }, [controller]);

    return (
        <BottomSheetContext.Provider value={{ store, controller }}>
            { children }
        </BottomSheetContext.Provider>
    );
};