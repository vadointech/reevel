import { Link } from "@/i18n/routing";

export default function NotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/apps/pwa/public">Return Home</Link>
        </div>
    );
} 