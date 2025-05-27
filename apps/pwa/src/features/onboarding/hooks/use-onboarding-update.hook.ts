"use client";

import { IOnboardingStore, useOnboardingProgress, useOnboardingStore } from "@/features/onboarding";
import { UpdateProfile, updateProfile } from "@/api/profile/update-profile";
import { useMutation } from "@tanstack/react-query";
import { revalidateCachedTag } from "@/features/cache";
import { GetSession } from "@/api/auth/get-session";

export function useOnboardingUpdate() {
    const onboardingStore = useOnboardingStore();

    const {
        step,
        handleNextStep,
        getOnboardingProgress,
    } = useOnboardingProgress();

    const { mutate } = useMutation({
        mutationFn: async(input: ObjectEntries<UpdateProfile.TInput>) => {
            const { onboardingStatus } = getOnboardingProgress(step + 1);
            return updateProfile({
                body: {
                    ...Object.fromEntries(input),
                    completed: onboardingStatus,
                },
            })
                .then(() => revalidateCachedTag(GetSession.queryKey))
                .then(handleNextStep);
        },
    });

    const handleUpdateProfile = () => {
        const onboardingProfile: UpdateProfile.TInput = {
            fullName: onboardingStore.fullName,
            bio: onboardingStore.bio,
            picture: onboardingStore.picture,
            interests: onboardingStore.interests,
        };

        if(onboardingStore.locationCenter && onboardingStore.locationBbox) {
            onboardingProfile.location = {
                center: onboardingStore.locationCenter,
                bbox: onboardingStore.locationBbox,
            };
        }

        const profileEntriesToUpdate = (Object.entries(onboardingProfile) as ObjectEntries<UpdateProfile.TInput>)
            .filter(([key, value]) => {
                const prevValue = onboardingStore.initialState[key as keyof IOnboardingStore];
                if(!prevValue) return true;
                return value !== prevValue;
            });

        mutate(profileEntriesToUpdate);
    };

    return {
        handleUpdateProfile,
    };
}