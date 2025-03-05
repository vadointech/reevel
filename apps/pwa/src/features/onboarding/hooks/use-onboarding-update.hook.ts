import { useOnboardingProgress, useOnboardingStore } from "@/features/onboarding";
import { useMutation } from "@tanstack/react-query";
import { UpdateProfile, updateProfile } from "@/api/profile/update-profile";
import { useSessionStore } from "../../session";
import { UserProfileEntity } from "@/entities/profile";

export function useOnboardingUpdate() {
    const sessionStore = useSessionStore();
    const onboardingStore = useOnboardingStore();

    const {
        handleNextStep,
    } = useOnboardingProgress();

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onSuccess(result) {
            if(result.data) {
                sessionStore.updateSession({
                    profile: {
                        fullName: result.data.fullName,
                        bio: result.data.bio,
                        picture: result.data.picture,
                    },
                });
                handleNextStep();
            }
        },
    });

    const handleUpdateProfile = () => {
        const sessionProfile = sessionStore.user?.profile;

        const onboardingProfile: UpdateProfile.TInput = {
            picture: onboardingStore.picture,
            fullName: onboardingStore.fullName,
            bio: onboardingStore.bio,
            interests: onboardingStore.interests.join(","),
            location: onboardingStore.location?.join(","),
        };

        if(sessionProfile) {
            const profileEntriesToUpdate = Object.entries(onboardingProfile)
                .filter(([key, value]) => {
                    return sessionProfile[key as keyof UserProfileEntity] !== value;
                });

            if(profileEntriesToUpdate.length > 0) {
                mutate(Object.fromEntries(profileEntriesToUpdate));
            } else {
                handleNextStep();
            }
        } else {
            mutate(onboardingProfile);
        }
    };

    return {
        handleUpdateProfile,
    };
}