"use client";

import { InterestEntity } from "@/entities/interests";
import { useRef, useState } from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { ObjectUnique } from "@/utils/object";

interface IFromValues {
    interests: InterestEntity[];
}

export function useFormInterestsPicker<T extends IFromValues>(interestsInit: InterestEntity[]) {
    const { getValues } = useFormContext<IFromValues>();

    const formInterestsRef = useRef<InterestEntity[]>(
        getValues("interests"),
    );

    const [interests] = useState<InterestEntity[]>(() => {
        return [
            ...new ObjectUnique(
                [
                    ...interestsInit,
                    ...formInterestsRef.current,
                ], "slug",
            ),
        ];
    });

    const handleAddInterest = (
        field: ControllerRenderProps<T>,
        interest: InterestEntity,
    ) => {
        formInterestsRef.current = [...formInterestsRef.current, interest];
        field.onChange(formInterestsRef.current);
    };

    const handleRemoveInterest = (
        field: ControllerRenderProps<T>,
        interest: InterestEntity,
    ) => {
        formInterestsRef.current = formInterestsRef.current.filter(item => item.slug !== interest.slug);
        field.onChange(formInterestsRef.current);
    };

    const isSelected = (interest: InterestEntity) => {
        return formInterestsRef.current.some(item => item.slug === interest.slug);
    };

    const handleToggle = (
        field: ControllerRenderProps<T>,
        interest: InterestEntity,
    ) => {
        const selected = isSelected(interest);
        if (selected) {
            handleRemoveInterest(field, interest);
        } else {
            handleAddInterest(field, interest);
        }
    };

    return {
        interests,
        handleToggle,
        isSelected,
    };
}