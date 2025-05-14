"use client"

import styles from "../styles.module.scss";
import cx from "classnames";
import { UploadDrawer } from "@/components/drawers/upload";
import { Header } from "@/components/shared/header";
import { Container } from "@/components/ui";
import { Section } from "@/components/shared/_redesign";
import { OptionItem, Options } from "@/components/shared/options";
import { Back, IconStar } from "@/components/icons";
import { IconExit } from "@/components/icons/exit";

import { AccountDrawer, AppearanceSection, LanguageDrawer, NotificationDrawer } from "./_components";
import { useSessionStore } from "@/features/session";
import { SubscriptionDrawer } from "@/components/drawers/subscription-drawer";



export default function PrivateProfileSettingsPage() {
    const session = useSessionStore()

    console.log(session)
    return (
        <Container className={styles.settings}>
            <Header
                title="Settings"
                size="large"
            />

            <AccountDrawer />
            <AppearanceSection className={styles.settings__appearance} />

            <Section title="General" className={styles.settings__general}>
                <Options>
                    <NotificationDrawer />
                    <LanguageDrawer />
                    <SubscriptionDrawer>
                        <OptionItem label="Subscription" description="Standart" icon={<IconStar width={22} height={22} fill="#212629" />} >
                            <Back width={7} height={14} style={{ rotate: "180deg" }} />
                        </OptionItem>
                    </SubscriptionDrawer>
                </Options>
                <OptionItem
                    className={styles.settings__exit}
                    label="Log out"
                    danger
                    onClick={() => session.logout()}
                    icon={<IconExit width={20} height={22} fill="#F62816" />}>
                </OptionItem>
            </Section>

        </Container>
    );
}