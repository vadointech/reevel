"use client";

import { useCallback, useRef } from "react";
import { revalidateSessionTag } from "@/features/cache";

import { useOnboardingProgress } from "./use-onboarding-progress.hook";
import { useSessionContext } from "@/features/session";
import { useProfileUpdate, UseProfileUpdateParams } from "@/features/profile/hooks";
import { useOnboardingFormContext } from "@/features/onboarding";
import { ObjectDiff } from "@/utils/object";

type ConfigParams = UseProfileUpdateParams & {
    revalidateQueryOnSuccess?: string[]
};

export function useOnboardingUpdate({
    revalidateQueryOnSuccess,
    ...params
}: ConfigParams = {}) {
    const session = useSessionContext();
    const form = useOnboardingFormContext();
    const shouldRevalidate = useRef(false);

    const {
        step,
        handleNextStep,
        getOnboardingProgress,
    } = useOnboardingProgress();

    const { handleUpdateProfile } = useProfileUpdate({
        onSettled: handleNextStep,
        onSuccess: (data) => {
            if (!data || !shouldRevalidate.current) return;

            shouldRevalidate.current = false;

            session.updateSession({
                profile: data,
            });

            if (revalidateQueryOnSuccess) {
                const { user } = session.store.toPlainObject();
                return revalidateSessionTag(user, revalidateQueryOnSuccess);
            }
        },
        ...params,
    });

    return useCallback(() => {
        const formValues = form.getValues();
        const diff = new ObjectDiff(form.store.defaultValues, formValues);
        const progress = getOnboardingProgress(step + 1);

        if (diff.hasChanges) {
            shouldRevalidate.current = true;
            const {
                location,
                interests,
                ...changedData
            } = diff.toObject();

            handleUpdateProfile({
                ...changedData,
                placeName: location ? location.displayName : undefined,
                locationCenter: location ?
                    [location.location.longitude, location.location.latitude]
                    : undefined,
                locationBbox: location ?
                    location.bbox
                    : undefined,
                interests: interests ?
                    interests.map(i => i.slug)
                    : undefined,
                completed: progress.status,
            });
        } else {
            const onboardingStep = Number(session.store.user?.profile.completed);

            if (isNaN(onboardingStep) || onboardingStep > step) {
                return handleNextStep();
            } else {
                handleUpdateProfile({
                    completed: progress.status,
                });
            }
        }

    }, [step, revalidateQueryOnSuccess, handleUpdateProfile]);
}