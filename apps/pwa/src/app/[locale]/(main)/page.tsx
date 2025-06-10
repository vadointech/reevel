import { Link } from "@/i18n/routing";
import { CreateEventDrawer } from "@/components/drawers/create-event";

export default function Home() {
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
        </div>
    );
}