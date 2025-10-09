"use client";

import { ReactNode, useEffect } from "react";
import { useAnimation } from "motion/react";

import { BottomSheetRootConfig } from "./config/root.config";
import { BottomSheetContext } from "./bottom-sheet.context";
import { BottomSheetRootController } from "./controllers";
import { BottomSheetStore } from "./store";
import { useBottomSheetGroupContext } from "./group";

import { IBottomSheetConfigParams, BottomSheetExternalController } from "./types";
import { useSingleton } from "@/hooks";
import { useMobxStore } from "@/lib/mobx";

export namespace BottomSheetRoot {
    export type Props = Partial<IBottomSheetConfigParams> & {
        id?: string;
        children: ReactNode;
        externalController?: BottomSheetExternalController;
    };
}

export const BottomSheetRoot = ({
    children,
    id,
    externalController,
    ...configProps
}: BottomSheetRoot.Props) => {
    const animationControls = useAnimation();

    const group = useBottomSheetGroupContext();

    const rootConfig = useSingleton(BottomSheetRootConfig, configProps);
    const store = useMobxStore(BottomSheetStore, rootConfig);

    const controller = useSingleton(
        BottomSheetRootController,
        rootConfig,
        store,
        animationControls,
    );

    useEffect(() => {
        if(group && id) {
            group.controllers.current[id] = controller;
        }

        if(externalController) {
            externalController.current = controller;
        }
    }, [id]);

    return (
        <BottomSheetContext.Provider value={{ store, controller }}>
            { children }
        </BottomSheetContext.Provider>
    );
};