import styles from "./styles.module.scss";

import { Header } from "@/components/shared/header";
import { Container } from "@/components/ui";

import { OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { SubscriptionDrawer } from "@/components/drawers/subscription-drawer";
import { IconExit } from "@/components/icons/exit";
import { AccountDrawer, NotificationDrawer, LanguageDrawer, AppearanceDrawer } from "./_components";

export default function PrivateProfileSettingsPage() {

    return (
        <Container className={styles.settings}>
            <Header
                title="Settings"
                size="large"
            />
            <div className={styles.gap}>
                <AccountDrawer />
            </div>

            <div className={styles.gap_lg} >
                <AppearanceDrawer />
            </div>

            <Section title="General" className={styles.gap_sm}>
                <OptionsList>
                    <NotificationDrawer />
                    <LanguageDrawer />
                    <SubscriptionDrawer />
                </OptionsList>
            </Section>

            <OptionsList>
                <OptionsListItem
                    className={styles.warn}
                    label="Log out"
                    contentLeft={<IconExit width={20} height={22} fill="#F62816" />}
                    contentRight={false}
                    variant={"warn"}
                />
            </OptionsList>
        </Container>
    );
}