"use client";

import { InterestEntity } from "@/entities/interests";
import { useInterestsPickerStore } from "../interests-picker.store";

type CallBacks = {
    onSelect: (item: InterestEntity) => void;
    onRemove: (item: InterestEntity) => void;
};

export function useInterestsPicker(callbacks: Partial<CallBacks> = {}) {
    const interestPickerStore = useInterestsPickerStore();

    const handleRemoveInterest = (item: InterestEntity) => {
        callbacks.onRemove?.(item);
        interestPickerStore.removeInterestFromSelection(item.slug);
    };

    const handleSelectInterest = (item: InterestEntity) => {
        callbacks.onSelect?.(item);
        interestPickerStore.addInterestToSelection(item);
    };

    const handleToggleInterest = (
        item: InterestEntity,
    ) => {
        const selected = interestPickerStore.isInterestSelected(item.slug);

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