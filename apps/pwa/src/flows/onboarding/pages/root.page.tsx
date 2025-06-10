import { getSession } from "@/api/auth/get-session";
import { headers } from "next/headers";
import { redirect } from "@/i18n/routing";
import { OnboardingStepPath } from "@/features/onboarding";
import { Locale } from "@/types/common";

export namespace OnboardingRootPage {
    export type Props = {
        locale: Locale
    };
}

export async function OnboardingRootPage({ locale }: OnboardingRootPage.Props) {
    const { data } = await getSession({
        nextHeaders: await headers(),
    });

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
