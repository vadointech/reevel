import {createNavigation} from "next-intl/navigation";
import {defineRouting} from "next-intl/routing";
import { defaultLocale, locales } from "@/i18n/locales";
 
export const routing = defineRouting({
    locales: locales,
    defaultLocale: defaultLocale,
    localeDetection: false,
    localePrefix: "as-needed",
}); 

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
