export const OnboardingStepPath = [
    "/onboarding/photo",
    "/onboarding/bio",
    "/onboarding/interests",
    "/onboarding/location",
    "/onboarding/location/pick-location",
    "/onboarding/location/confirm",
    "/",
] as const;

export type OnboardingStepPath = typeof OnboardingStepPath[number];