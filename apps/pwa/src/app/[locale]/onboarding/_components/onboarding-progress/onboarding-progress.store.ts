import { makeObservable, action, observable } from "mobx";
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

export type OnboardingStepPath = typeof onboardingSteps[number];

class OnboardingProgressStore {
    step: number = 0;

    constructor() {
        makeObservable(this, {
            step: observable,
            init: action,
            nextStep: action,
            prevStep: action,
            skipStep: action,
        });
    }

    init(pathname: string) {
        this.step = onboardingSteps.indexOf(pathname as OnboardingStepPath);
    }

    setStep(step: OnboardingStepPath, router: AppRouterInstance): void;
    setStep(step: number, router: AppRouterInstance): void;
    setStep(step: OnboardingStepPath | number, router: AppRouterInstance) {
        if(typeof step === "number") {
            router.push(onboardingSteps[step]);
            this.step = step;
        } else {
            const onboardingStep = onboardingSteps.indexOf(step);
            router.push(step);
            this.step = onboardingStep;
        }
    }

    nextStep(router: AppRouterInstance) {
        this.setStep(this.step + 1, router);
    }

    prevStep(router: AppRouterInstance) {
        this.setStep(this.step - 1, router);
    }

    skipStep(router: AppRouterInstance) {
        const current = onboardingSteps[this.step];
        const nextSteps = onboardingSteps.slice(this.step);

        for(const step of nextSteps) {
            if(step.startsWith(current)) {
                continue;
            }
            this.setStep(onboardingSteps.indexOf(step), router);
            break;
        }
    }
}

export const onboardingProgressStore = new OnboardingProgressStore();