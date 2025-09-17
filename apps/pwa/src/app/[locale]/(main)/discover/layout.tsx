import { PropsWithChildren } from "react";
import { DiscoverRootLayout } from "@/flows/discover/layouts";

export default async function Layout(props: PropsWithChildren) {
    return <DiscoverRootLayout {...props} />;
}