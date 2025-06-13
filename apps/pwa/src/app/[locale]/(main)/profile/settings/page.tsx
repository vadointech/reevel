
import { Container, Header, OptionsList, OptionsListItem } from "@/components/ui";
import { SubscriptionDrawer } from "@/components/drawers/subscription";
import { Section } from "@/components/sections";
import { IconExit } from "@/components/icons";
import { AccountDrawer, NotificationDrawer, LanguageDrawer, AppearanceDrawer } from "./_components";

import styles from "./styles.module.scss";

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
                />
            </OptionsList>
        </Container>
    );
}