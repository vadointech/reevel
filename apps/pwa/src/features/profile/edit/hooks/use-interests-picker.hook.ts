"use client";

import { InterestEntity } from "@/entities/interests";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ObjectUnique } from "@/utils/object";
import { EditProfileFormSchemaValues } from "../edit-profile-form.scheme";

export function useEditProfileFormInterestsPicker(interestsInit: InterestEntity[]) {
    const { getValues } = useFormContext<EditProfileFormSchemaValues>();

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


    return {
        interests,
    };
}