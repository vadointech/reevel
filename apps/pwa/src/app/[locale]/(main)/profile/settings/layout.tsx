import { PropsWithChildren } from "react";
import { ProfileSettingsLayout } from "@/flows/profile-settings/layouts";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <ProfileSettingsLayout>
            { children }
        </ProfileSettingsLayout>
    );
}