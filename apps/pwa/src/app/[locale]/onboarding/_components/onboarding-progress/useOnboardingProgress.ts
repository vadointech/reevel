"use client";

import { useSessionStore } from "../../../../../features/session";
import { usePathname, useRouter } from "@/i18n/routing";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const onboardingSteps = [
    "/onboarding/photo",
    "/onboarding/bio",
    "/onboarding/interests",
    "/onboarding/location",
    "/onboarding/location/pick",
    "/onboarding/location/confirm",
    "/",
] as const;

function setStep(step: OnboardingStepPath, router: AppRouterInstance): void;
function setStep(step: number, router: AppRouterInstance): void;
function setStep(step: OnboardingStepPath | number, router: AppRouterInstance) {
    if(typeof step === "number") {
        router.push(onboardingSteps[step]);
    } else {
        router.push(step);
    }
}


export type OnboardingStepPath = typeof onboardingSteps[number];


export function useOnboardingProgress() {
    const router = useRouter();
    const pathname = usePathname();

    const sessionStore = useSessionStore();

    const step = onboardingSteps.indexOf(pathname as OnboardingStepPath);

    const handleSetStep = (step: OnboardingStepPath) => {
        setStep(step, router);
    };

    const handleNext = () => {
        setStep(step + 1, router);
    };

    const handlePrev = () => {
        setStep(step - 1, router);
    };

    const handleSkip = () => {
        const current = onboardingSteps[step];
        const nextSteps = onboardingSteps.slice(step);

        for(const step of nextSteps) {
            if(step.startsWith(current)) {
                continue;
            }
            setStep(onboardingSteps.indexOf(step), router);
            break;
        }
    };

    const handleQuit = () => {
        sessionStore.logout();
    };

    return {
        step,
        handleSetStep,
        handlePrev,
        handleNext,
        handleSkip,
        handleQuit,
    };
}