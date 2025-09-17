import { Link, redirect } from "@/i18n/routing";
import { CreateEventDrawer } from "@/components/drawers/create-event";
import { ParamsWithLocale } from "@/types/common";

export default async function Home({ params }: ParamsWithLocale) {
    const { locale } = await params;

    redirect({
        href: "/discover",
        locale,
    });

    return (
        <div>
            <CreateEventDrawer>
                Create event
            </CreateEventDrawer>
            <Link href={"/profile"}>
                To profile
            </Link>
            <Link href={"/profile/settings"}>
                To profile settings
            </Link>
            <Link href={"/discover"}>
                To Discover
            </Link>
            <Link href={"/event/public/1"}>
                To Event
            </Link>
        </div>
    );
}