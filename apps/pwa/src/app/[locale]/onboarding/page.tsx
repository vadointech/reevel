import { ParamsWithLocale } from "@/types/common";
import { redirect } from "@/i18n/routing";

export default async function Page({ params }: ParamsWithLocale) {
    const { locale } = await params;

    return redirect({
        href: "/onboarding/photo",
        locale,
    });
}