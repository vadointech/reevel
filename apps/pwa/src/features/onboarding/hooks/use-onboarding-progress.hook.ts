"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { OnboardingStepPath } from "@/features/onboarding";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLogout } from "@/features/session";

function setStep(step: OnboardingStepPath, router: AppRouterInstance): void;
function setStep(step: number, router: AppRouterInstance): void;
function setStep(step: OnboardingStepPath | number, router: AppRouterInstance) {
    if(typeof step === "number") {
        router.push(OnboardingStepPath[step]);
    } else {
        router.push(step);
    }
}

export function useOnboardingProgress() {

    const {
        handleLogout,
    } = useLogout();

    const router = useRouter();
    const pathname = usePathname();

    const step = OnboardingStepPath.indexOf(pathname as OnboardingStepPath);

    const handleNextStep = () => {
        setStep(step + 1, router);
    };

    const handlePrevStep = () => {
        setStep(step - 1, router);
    };

    const handleSetStep = (step: OnboardingStepPath) => {
        setStep(step, router);
    };

    const handleSkipStep = () => {
        const current = OnboardingStepPath[step];
        const nextSteps = OnboardingStepPath.slice(step);

        for(const step of nextSteps) {
            if(step.startsWith(current)) {
                continue;
            }
            setStep(OnboardingStepPath.indexOf(step), router);
            break;
        }
    };

    const handleQuitOnboarding = () => {
        handleLogout();
    };

    const getOnboardingStatus = () => {
        const nexStep = step + 1;
        if(nexStep === OnboardingStepPath.length - 1) return "true";
        return String(nexStep);
    };

    return {
        step,
        handleNextStep,
        handlePrevStep,
        handleSetStep,
        handleSkipStep,
        handleQuitOnboarding,
        getOnboardingStatus,
    };
}