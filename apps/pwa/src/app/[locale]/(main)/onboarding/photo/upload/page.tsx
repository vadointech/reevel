import { OnboardingAvatarUploadPage } from "@/flows/onboarding/pages";

export default function Page() {
    return (
        <OnboardingAvatarUploadPage callbackUrl={"/onboarding/photo"} />
    );
}