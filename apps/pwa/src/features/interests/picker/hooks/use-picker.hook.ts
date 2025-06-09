"use client";

import { InterestEntity } from "@/entities/interests";
import { useInterestsPickerContext } from "../interests-picker.context";

type CallBacks = {
    onSelect: (item: InterestEntity) => void;
    onRemove: (item: InterestEntity) => void;
};

export function useInterestsPicker(callbacks: Partial<CallBacks> = {}) {
    const { controller } = useInterestsPickerContext();

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

        if(selected) {
            handleRemoveInterest(item);
        } else {
            handleSelectInterest(item);
        }
    };

    return {
        handleSelectInterest,
        handleRemoveInterest,
        handleToggleInterest,
    };
}