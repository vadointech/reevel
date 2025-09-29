import { DiscoverPage } from "@/flows/discover/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: {
        canonical: "/discover",
    },
};

export default async function Page() {
    return (
        <DiscoverPage />
    );
}