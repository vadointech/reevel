import { Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";

import { ProfileSettingsForm } from "../modules/form";

import styles from "../styles/profile-settings-page.module.scss";

export namespace ProfileSettingsPage {
    export type Props = never;
}

export function ProfileSettingsPage() {
    return (
        <>
            <Header
                iconBefore={<IconArrowLeft />}
                className={styles.page__header}
            >
                Settings
            </Header>

            <ProfileSettingsForm />
        </>
    );
}
