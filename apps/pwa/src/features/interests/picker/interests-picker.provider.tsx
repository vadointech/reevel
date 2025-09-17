"use client";

import { ReactNode, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { InterestsPickerContext } from "./interests-picker.context";
import { InterestsPickerStore } from "./interests-picker.store";
import { InterestsPickerController } from "./interests-picker.controller";
import { IInterestsPickerStore, InterestsPickerRootConfigParams } from "./types";

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
    }, [syncFormField]);

    const store = useMemo(() => {
        return new InterestsPickerStore(...interestsPickerStoreInit);
    }, [interestsPickerStoreInit]);

    const controller = useMemo(() => {
        return new InterestsPickerController(store);
    }, [store]);

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
