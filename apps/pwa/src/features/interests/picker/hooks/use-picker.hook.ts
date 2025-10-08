"use client";

import { InterestEntity } from "@/entities/interests";
import { useInterestsPickerContext } from "../interests-picker.context";
import { useEffect } from "react";
import { IReactionDisposer, reaction } from "mobx";

type CallBacks = {
    onSelect: (item: InterestEntity) => void;
    onRemove: (item: InterestEntity) => void;
    onChange: (item: InterestEntity[]) => void;
};

export function useInterestsPicker(callbacks: Partial<CallBacks> = {}) {
    const { controller, store } = useInterestsPickerContext();

    const handleRemoveInterest = (item: InterestEntity) => {
        callbacks.onRemove?.(item);
        controller.removeInterestFromSelection(item.slug);
    };

    const handleSelectInterest = (item: InterestEntity) => {
        callbacks.onSelect?.(item);
        controller.addInterestToSelection(item);
    };

    const handleToggleInterest = (
        item: InterestEntity,
    ) => {
        const selected = controller.isInterestSelected(item.slug);

        if (selected) {
            handleRemoveInterest(item);

        } else {
            handleSelectInterest(item);
        }
    };

    useEffect(() => {
        const disposers: IReactionDisposer[] = [];

        if (callbacks.onChange) {
            disposers.push(
                reaction(
                    () => store.selectedInterests,
                    callbacks.onChange,
                ),
            );
        }

        return () => {
            disposers.forEach(disposer => disposer());
        };
    }, [callbacks]);

    return {
        handleSelectInterest,
        handleRemoveInterest,
        handleToggleInterest,
    };
}