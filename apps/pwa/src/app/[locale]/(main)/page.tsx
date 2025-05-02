import { Link } from "@/i18n/routing";

export default function Home() {
    return (
        <>
            <Link href={"/event/slug"} style={{ position: "fixed", top: 0, left: 0, zIndex: 100 }}>
                To event
            </Link>
        </>
    );
}