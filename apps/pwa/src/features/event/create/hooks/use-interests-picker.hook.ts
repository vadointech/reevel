"use client";

import { InterestEntity } from "@/entities/interests";
import { useRef, useState } from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { CreateEventFormSchemaValues } from "@/features/event/create";
import { ObjectUnique } from "@/utils/object";

export function useCreateEventFormInterestsPicker(interestsInit: InterestEntity[]) {
    const { getValues } = useFormContext<CreateEventFormSchemaValues>();

    const formInterestsRef = useRef<InterestEntity[]>(getValues("interests"));

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
        field: ControllerRenderProps<CreateEventFormSchemaValues>,
        interest: InterestEntity,
    ) => {
        formInterestsRef.current = [...formInterestsRef.current, interest];
        field.onChange(formInterestsRef.current);
    };

    const handleRemoveInterest = (
        field: ControllerRenderProps<CreateEventFormSchemaValues>,
        interest: InterestEntity,
    ) => {
        formInterestsRef.current = formInterestsRef.current.filter(item => item.slug !== interest.slug);
        field.onChange(formInterestsRef.current);
    };

    const isSelected = (interest: InterestEntity) => {
        return formInterestsRef.current.some(item => item.slug === interest.slug);
    };

    const handleToggle = (
        field: ControllerRenderProps<CreateEventFormSchemaValues>,
        interest: InterestEntity,
    ) => {
        const selected = isSelected(interest);
        if(selected) {
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