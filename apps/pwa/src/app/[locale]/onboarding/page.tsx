import { redirect } from "@/i18n/routing";
import { ParamsWithLocale } from "@/types/common";

export default async function Page({ params }: ParamsWithLocale) {
    const { locale } = await params;

    return redirect({
        href: "/onboarding/photo",
        locale,
    });
}