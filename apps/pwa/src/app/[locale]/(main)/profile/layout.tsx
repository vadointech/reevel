import { PropsWithChildren } from "react";
import { ParamsWithLocale } from "@/types/common";


import styles from "./styles.module.scss";
import { ProfileSettingsStoreProvider } from "@/features/profile/settings";


export default async function ProfileLayout({ children }: PropsWithChildren<ParamsWithLocale>) {
    return (
        <ProfileSettingsStoreProvider init={[]}>
            <div className={styles.layout}>
                {children}
            </div>
        </ProfileSettingsStoreProvider>
    );
}