import { Link } from "@/i18n/routing";

export default function Home() {
    return (
        <div>
            <Link href={"/event/slug"}>
                To event
            </Link>
            <Link href={"/profile/slug"}>
                To profile
            </Link>
        </div>
    );
}