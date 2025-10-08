import { PropsWithChildren } from "react";
import { ProfileLayout } from "@/flows/profile/layouts";

export default async function Layout({ children }: PropsWithChildren) {
    return (
        <ProfileLayout>
            {children}
        </ProfileLayout>
    );
}