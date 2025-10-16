"use client";

import { useCallback } from "react";

import { useOnboardingProgress } from "./use-onboarding-progress.hook";
import { useSessionContext } from "@/features/session";
import { ObjectDiff } from "@/utils/object";
import { useMutation } from "@tanstack/react-query";
import { useEditProfileFormContext } from "@/features/profile/update";
import { EditProfileFormMapper } from "@/features/profile/mappers";
import { UpdateProfileMutation } from "@/features/profile/queries";
import { refreshTokens } from "@/api/auth";
import { useRouter } from "@/i18n/routing";

type ConfigParams = {
    revalidateQueryOnSuccess?: string[]
};

export function useOnboardingUpdate({
    revalidateQueryOnSuccess,
}: ConfigParams = {}) {
    const session = useSessionContext();
    const router = useRouter();
    const form = useEditProfileFormContext();

    const {
        step,
        handleNextStep,
        getOnboardingProgress,
    } = useOnboardingProgress();

    const updateSessionMutation = useMutation({
        mutationFn: () => refreshTokens({}),
        onSuccess: () => {
            router.replace("/discover");
        },
    });

    const updateProfileMutation = useMutation({
        ...UpdateProfileMutation,
        onSuccess: (data) => {
            if (!data) return;

            session.updateSession({
                profile: data,
            });

            form.store.setFormValues(
                form.getValues(),
            );

            if(data.completed === -1) {
                updateSessionMutation.mutate();
            } else {
                handleNextStep();
            }
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
        isUpdating: updateProfileMutation.isPending || updateSessionMutation.isPending,
    };
}