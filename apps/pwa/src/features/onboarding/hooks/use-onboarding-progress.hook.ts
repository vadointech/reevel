"use client";

import { OnboardingStepPath } from "@/features/onboarding";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLogout } from "@/features/session/hooks";
import { useMutation } from "@tanstack/react-query";
import { updateProfileAction } from "@/features/profile/update/actions";

export function useOnboardingProgress() {

    const { handleLogout } = useLogout();

    const router = useRouter();
    const pathname = usePathname();

    const step = OnboardingStepPath.indexOf(pathname as OnboardingStepPath);

    const updateUserProfileMutation = useMutation({
        mutationFn: updateProfileAction,
    });

    function getOnboardingProgress(step: OnboardingStepPath | number) {
        const stepIndex = function(){
            return typeof step === "number" ? step : OnboardingStepPath.indexOf(step);
        }();

        const onboardingStatus = function(){
            return stepIndex === OnboardingStepPath.length - 1 ? -1 : stepIndex;
        }();

        return {
            index: stepIndex,
            status: onboardingStatus,
        };
    }

    async function updateOnboardingProgressAsync(step: OnboardingStepPath | number) {
        const progress = getOnboardingProgress(step);
        updateUserProfileMutation.mutateAsync({
            completed: progress.status,
        }).then(() => router.push(OnboardingStepPath[progress.index]));
    }

    function updateOnboardingProgress(step: OnboardingStepPath | number) {
        const progress = getOnboardingProgress(step);
        router.push(OnboardingStepPath[progress.index]);
    }


    const handleNextStep = () => {
        return updateOnboardingProgress(step + 1);
    };

    const handlePrevStep = () => {
        return updateOnboardingProgress(step - 1);
    };

    const handleSetStep = (step: OnboardingStepPath) => {
        return updateOnboardingProgress(step);
    };

    const handleSkipStep = () => {
        const current = OnboardingStepPath[step];
        const nextSteps = OnboardingStepPath.slice(step);

        for(const step of nextSteps) {
            if(step.startsWith(current)) {
                continue;
            }
            updateOnboardingProgressAsync(step);
            break;
        }
    };

    const handleQuitOnboarding = () => {
        handleLogout();
    };

    return {
        step,
        handleNextStep,
        handlePrevStep,
        handleSetStep,
        handleSkipStep,
        handleQuitOnboarding,
        getOnboardingProgress,
    };
}