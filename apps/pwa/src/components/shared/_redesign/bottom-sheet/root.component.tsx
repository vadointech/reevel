"use client";

import { PropsWithChildren, useState } from "react";
import { BottomSheetStoreProvider } from "./store";
import { BottomSheetRootConfig, IBottomSheetRootConfig } from "./config/root.config";

export namespace BottomSheetRoot {
    export type Props = PropsWithChildren<Partial<IBottomSheetRootConfig>>;
}

export const BottomSheetRoot = ({
    children,
    ...configProps
}: BottomSheetRoot.Props) => {

    const [rootConfig] = useState(() => {
        return new BottomSheetRootConfig(configProps);
    });

    return (
        <BottomSheetStoreProvider
            init={[rootConfig]}
        >
            { children }
        </BottomSheetStoreProvider>
    );
};
