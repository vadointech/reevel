import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSessionStore } from "../../session";

const onboardingSteps = [
    "/onboarding/photo",
    "/onboarding/bio",
    "/onboarding/interests",
    "/onboarding/location",
    "/onboarding/location/pick",
    "/onboarding/location/confirm",
    "/",
] as const;

type OnboardingStepPath = typeof onboardingSteps[number];

function setStep(step: OnboardingStepPath, router: AppRouterInstance): void;
function setStep(step: number, router: AppRouterInstance): void;
function setStep(step: OnboardingStepPath | number, router: AppRouterInstance) {
    if(typeof step === "number") {
        router.push(onboardingSteps[step]);
    } else {
        router.push(step);
    }
}

export function useOnboardingProgress() {
    const sessionStore = useSessionStore();

    const router = useRouter();
    const pathname = usePathname();

    const step = onboardingSteps.indexOf(pathname as OnboardingStepPath);

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

    const handleQuitOnboarding = () => {
        sessionStore.logout()
            .then(() => router.replace("/login"));
    };

    return {
        handleNextStep,
        handlePrevStep,
        handleSetStep,
        handleSkipStep,
        handleQuitOnboarding,
    };
}