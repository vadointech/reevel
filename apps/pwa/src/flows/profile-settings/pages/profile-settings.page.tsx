import { Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";

import { ProfileSettingsForm } from "../modules/form";

import styles from "../styles/profile-settings-page.module.scss";
import { Link } from "@/i18n/routing";

export namespace ProfileSettingsPage {
    export type Props = never;
}

export function ProfileSettingsPage() {
    return (
        <>
            <Header
                iconBefore={<Link href={"/profile"}><IconArrowLeft /></Link>}
                className={styles.page__header}
            >
                Settings
            </Header>

            <ProfileSettingsForm />
        </>
    );
}
