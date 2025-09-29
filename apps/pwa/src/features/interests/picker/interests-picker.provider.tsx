"use client";

import { ReactNode, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { InterestsPickerContext } from "./interests-picker.context";
import { InterestsPickerStore } from "./interests-picker.store";
import { InterestsPickerController } from "./interests-picker.controller";
import { IInterestsPickerStore, InterestsPickerRootConfigParams } from "./types";
import { useSingleton } from "@/hooks";
import { useMobxStore } from "@/lib/mobx";

export namespace InterestsPickerProvider {
    export type Props = Partial<IInterestsPickerStore> & InterestsPickerRootConfigParams & {
        children: ReactNode;
        syncFormField?: string;
    };
}

export const InterestsPickerProvider = ({
    children,
    syncFormField,
    callbackUrl,
    ...initStore
}: InterestsPickerProvider.Props) => {
    const form = useFormContext();
    const interestsPickerStoreInit: ConstructorParameters<typeof InterestsPickerStore> = useMemo(() => {
        if (syncFormField) {
            initStore.selectedInterests = form.getValues(syncFormField);
            return [
                initStore,
                (value) => {
                    if (syncFormField && form) {
                        form.setValue(syncFormField, value);
                    }
                },
            ];
        }

        return [initStore];
    }, []);

    const store = useMobxStore(InterestsPickerStore, ...interestsPickerStoreInit);
    const controller = useSingleton(InterestsPickerController, store);

    return (
        <InterestsPickerContext.Provider
            value={{
                store,
                controller,
                config: {
                    callbackUrl,
                },
            }}
        >
            {children}
        </InterestsPickerContext.Provider>
    );
};
