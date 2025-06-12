"use client";

import { OnboardingStepPath } from "@/features/onboarding";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLogout } from "@/features/session";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/api/profile/update-profile";

export function useOnboardingProgress() {

    const {
        handleLogout,
    } = useLogout();

    const router = useRouter();
    const pathname = usePathname();

    const step = OnboardingStepPath.indexOf(pathname as OnboardingStepPath);

    const { mutateAsync } = useMutation({
        mutationFn: updateProfile,
    });

    function getOnboardingProgress(step: OnboardingStepPath | number) {
        const stepIndex = function(){
            return typeof step === "number" ? step : OnboardingStepPath.indexOf(step);
        }();

        const onboardingStatus = function(){
            return stepIndex === OnboardingStepPath.length - 1 ? "true" : String(stepIndex);
        }();

        return {
            stepIndex,
            onboardingStatus,
        };
    }

    async function updateOnboardingProgressAsync(step: OnboardingStepPath | number) {
        const { onboardingStatus, stepIndex } = getOnboardingProgress(step);
        return mutateAsync({
            body: { completed: onboardingStatus },
        }).then(() => router.push(OnboardingStepPath[stepIndex]));
    }

    function updateOnboardingProgress(step: OnboardingStepPath | number) {
        const { stepIndex } = getOnboardingProgress(step);
        router.push(OnboardingStepPath[stepIndex]);
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
        updateOnboardingProgress,
        updateOnboardingProgressAsync,
    };
}