"use client";

import { createContext, useContext } from "react";
import { IInterestsPickerController, IInterestsPickerStore, InterestsPickerRootConfigParams } from "./types";

type InterestsPickerContextValues = {
    store: IInterestsPickerStore;
    controller: IInterestsPickerController;
    config: InterestsPickerRootConfigParams;
};

export const InterestsPickerContext = createContext<InterestsPickerContextValues | null>(null);

export function useInterestsPickerContext() {
    const ctx = useContext(InterestsPickerContext);
    if(!ctx) {
        throw new Error("useInterestsPickerContext must be used within InterestsPickerContextProvider");
    }
    return ctx;
}