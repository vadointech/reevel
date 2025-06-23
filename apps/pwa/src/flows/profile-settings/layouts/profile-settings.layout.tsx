import { PropsWithChildren } from "react";
import { ProfileSettingsStoreProvider } from "@/features/profile/settings";

export namespace ProfileSettingsLayout {
    export type Props = PropsWithChildren;
}

export function ProfileSettingsLayout({ children }: ProfileSettingsLayout.Props) {
    return (
        <ProfileSettingsStoreProvider init={[]}>
            { children }
        </ProfileSettingsStoreProvider>
    );
}
