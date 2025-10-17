"use client";

import { ReactNode, useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { InterestsPickerContext } from "./interests-picker.context";
import { InterestsPickerStore } from "./interests-picker.store";
import { InterestsPickerController } from "./interests-picker.controller";
import { IInterestsPickerStore, InterestsPickerRootConfigParams } from "./types";
import { useSingleton } from "@/hooks";
import { useMobxStore } from "@/lib/mobx";
import { useQueryClient } from "@tanstack/react-query";
import { GetCurrentUserInterestsQuery } from "@/features/profile/queries";
import { ObjectUnique } from "@/utils/object";

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
    const queryClient = useQueryClient();
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

    useEffect(() => {
        if(!initStore.interests) return;

        queryClient.fetchQuery(GetCurrentUserInterestsQuery())
            .then(interests => {
                if(!initStore.interests) return;
                if(interests.length === 0) return;

                store.setInterests([
                    ...new ObjectUnique([
                        ...initStore.interests,
                        ...interests,
                    ], "slug"),
                ]);

                store.setSelectedInterests(interests);
            });
    }, []);

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
