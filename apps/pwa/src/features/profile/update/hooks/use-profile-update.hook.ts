"use client";

import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { ObjectDiff } from "@/utils/object";
import { useSessionContext } from "@/features/session";
import { updateProfileAction } from "@/features/profile/update/actions";

import { useEditProfileFormContext } from "../edit-profile-form.context";

import { EditProfileFormMapper } from "@/features/profile/mappers";

export function useProfileUpdate() {
    const router = useRouter();
    const session = useSessionContext();
    const form = useEditProfileFormContext();

    const updateProfileMutation = useMutation({
        mutationFn: updateProfileAction,
        onSuccess: (data) => {
            if (!data) return;

            session.updateSession({
                profile: data,
            });

            form.store.setFormValues(form.getValues());

            router.push("/profile");
        },
        onError: (error) => {
            console.error("Failed to update profile:", error);
        },
    });

    const handleSubmit = useCallback(() => {
        const diff = new ObjectDiff(
            form.store.formValues,
            form.getValues(),
        );

        if(!diff.hasChanges) {
            router.push("/profile");
            return;
        }

        updateProfileMutation.mutate(
            EditProfileFormMapper.toUpdateProfileRequestInput(
                diff.toObject(),
            ),
        );
    }, [form, router, updateProfileMutation]);

    return {
        handleSubmit,
        isUpdating: updateProfileMutation.isPending,
    };
}