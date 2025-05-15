import { Link } from "@/i18n/routing";

export default function Home() {
    return (
        <div>
            <Link href={"/event/create"}>
                To event
            </Link>
            <Link href={"/profile"}>
                To profile
            </Link>
        </div>
    );
}