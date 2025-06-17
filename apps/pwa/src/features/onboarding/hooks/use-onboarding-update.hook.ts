"use client";

import { useOnboardingProgress } from "./use-onboarding-progress.hook";
import { UpdateProfile, updateProfile } from "@/api/profile/update-profile";
import { useMutation } from "@tanstack/react-query";
import { revalidateSessionTag } from "@/features/cache";
import { useOnboardingStore } from "../onboarding.store";
import { IOnboardingStore } from "../types";
import { useSessionContext } from "@/features/session";
import { GetCurrentUserInterests } from "@/api/user";

export function useOnboardingUpdate() {
    const session = useSessionContext();
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
            });
        },
        onSuccess: (_data, variables) => {
            for(const [key] of variables) {
                if(key === "interests") {
                    return revalidateSessionTag(session.store.user?.sessions, GetCurrentUserInterests.queryKey);
                }
            }
        },
        onSettled: handleNextStep,
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