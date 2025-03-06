"use client";

import { IOnboardingStore, useOnboardingProgress, useOnboardingStore } from "@/features/onboarding";
import { UpdateProfile, updateProfile } from "@/api/profile/update-profile";
import { useMutation } from "@tanstack/react-query";

export function useOnboardingUpdate() {
    const onboardingStore = useOnboardingStore();

    const {
        handleNextStep,
        getOnboardingStatus,
    } = useOnboardingProgress();

    const { mutate } = useMutation({
        mutationFn: async(input: ObjectEntries<UpdateProfile.TInput>) => {
            await updateProfile({
                body: {
                    ...Object.fromEntries(input),
                    completed: getOnboardingStatus(),
                },
            }).then(handleNextStep);
            return null;
        },
    });

    const handleUpdateProfile = () => {
        const onboardingProfile: UpdateProfile.TInput = {
            fullName: onboardingStore.fullName,
            bio: onboardingStore.bio,
            picture: onboardingStore.picture,
            interests: onboardingStore.interests,
            location: onboardingStore.location,
        };

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