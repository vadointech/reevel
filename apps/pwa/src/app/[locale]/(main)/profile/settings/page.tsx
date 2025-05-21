import styles from "../styles.module.scss";

import { Header } from "@/components/shared/header";
import { Container } from "@/components/ui";


import { useSessionStore } from "@/features/session";
import { ProfileSettings } from "./_components";



export default function PrivateProfileSettingsPage() {

    return (
        <Container className={styles.settings}>
            <Header
                title="Settings"
                size="large"
            />

            <ProfileSettings />
        </Container>
    );
}