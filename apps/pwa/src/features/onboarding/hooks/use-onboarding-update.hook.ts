"use client";

import { useCallback, useRef } from "react";

import { useOnboardingProgress } from "./use-onboarding-progress.hook";
import { useSessionContext } from "@/features/session";
import { useProfileUpdate, UseProfileUpdateParams } from "@/features/profile/hooks";
import { useOnboardingFormContext } from "@/features/onboarding";
import { ObjectDiff } from "@/utils/object";
import { UpdateProfile } from "@/api/profile";

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

            form.store.setFormValues(
                form.getValues(),
            );
        },
        ...params,
    });

    return useCallback(() => {
        const diff = new ObjectDiff(
            form.store.formValues,
            form.getValues(),
        );
        const progress = getOnboardingProgress(step + 1);

        if (diff.hasChanges) {
            shouldRevalidate.current = true;
            const {
                location,
                interests,
                ...changedData
            } = diff.toObject();

            const profileToUpdate: UpdateProfile.TInput = {
                placeName: location?.displayName,
                bio: changedData.bio,
                fullName: changedData.fullName,
                picture: changedData.picture,
                completed: progress.status,
            };

            if (location) {
                profileToUpdate.locationCenter = [location.location.longitude, location.location.latitude];
                profileToUpdate.locationBbox = location.bbox;
            }

            if (interests) {
                profileToUpdate.interests = interests.map(item => item.slug);
            }

            handleUpdateProfile(profileToUpdate);
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