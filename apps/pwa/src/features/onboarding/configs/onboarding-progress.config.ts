export const OnboardingStepPath = [
    "/onboarding/photo",
    "/onboarding/bio",
    "/onboarding/interests",
    "/onboarding/location-badge",
    "/onboarding/location-badge/pick",
    "/onboarding/location-badge/confirm",
    "/",
] as const;

export type OnboardingStepPath = typeof OnboardingStepPath[number];