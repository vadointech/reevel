import { createContext, useContext } from "react";

export type CropperContextValues = {
    handleCropImage: () => void;
};

export const CropperContext = createContext<CropperContextValues | null>(null);

export function useCropperContext() {
    const ctx = useContext(CropperContext);

    if (!ctx) {
        throw new Error("useCropperContext must be used within <CropperContextProvider />");
    }

    return ctx;
}