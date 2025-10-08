"use client";

import { useCallback } from "react";

import { useOnboardingProgress } from "./use-onboarding-progress.hook";
import { useSessionContext } from "@/features/session";
import { ObjectDiff } from "@/utils/object";
import { useMutation } from "@tanstack/react-query";
import { updateProfileAction } from "@/features/profile/update/actions";
import { useEditProfileFormContext } from "@/features/profile/update";
import { EditProfileFormMapper } from "@/features/profile/mappers";

type ConfigParams = {
    revalidateQueryOnSuccess?: string[]
};

export function useOnboardingUpdate({
    revalidateQueryOnSuccess,
}: ConfigParams = {}) {
    const session = useSessionContext();
    const form = useEditProfileFormContext();

    const {
        step,
        handleNextStep,
        getOnboardingProgress,
    } = useOnboardingProgress();

    const updateProfileMutation = useMutation({
        mutationFn: updateProfileAction,
        onSettled: handleNextStep,
        onSuccess: (data) => {
            if (!data) return;

            session.updateSession({
                profile: data,
            });

            form.store.setFormValues(
                form.getValues(),
            );
        },
    });

    const handleUpdate = useCallback(() => {
        const diff = new ObjectDiff(
            form.store.formValues,
            form.getValues(),
        );
        const progress = getOnboardingProgress(step + 1);

        if(!diff.hasChanges) {
            return handleNextStep();
        }

        updateProfileMutation.mutate({
            ...EditProfileFormMapper.toUpdateProfileRequestInput(
                diff.toObject(),
            ),
            completed: progress.status,
        });
    }, [step, revalidateQueryOnSuccess]);

    return {
        handleUpdate,
        isUpdating: updateProfileMutation.isPending,
    };
}