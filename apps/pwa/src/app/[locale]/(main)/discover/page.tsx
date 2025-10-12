import { DiscoverPage } from "@/flows/discover/pages";
import { Metadata } from "next";
import { BASE_URL } from "@/auth.config";

export const dynamic = "force-static";

export const metadata: Metadata = {
    alternates: {
        canonical: `${BASE_URL}/discover`,
    },
};

export default async function Page() {
    return (
        <DiscoverPage />
    );
}