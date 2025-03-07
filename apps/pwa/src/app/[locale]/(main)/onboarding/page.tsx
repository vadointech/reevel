import { redirect } from "@/i18n/routing";
import { ParamsWithLocale } from "@/types/common";
import { getSession } from "@/api/auth/get-session";
import { OnboardingStepPath } from "@/features/onboarding";

export default async function Page({ params }: ParamsWithLocale) {
    const { locale } = await params;

    const { data } = await getSession();

    const onboardingStep = Number(data?.profile.completed);

    if(isNaN(onboardingStep)) {
        return redirect({
            href: "/onboarding/photo",
            locale,
        });
    }

    return redirect({
        href: OnboardingStepPath[onboardingStep],
        locale,
    });
}