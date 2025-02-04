import { PropsWithChildren } from "react";
import { RootProviders } from "@/app/providers";

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <RootProviders>
            { children }
        </RootProviders>
    );
}