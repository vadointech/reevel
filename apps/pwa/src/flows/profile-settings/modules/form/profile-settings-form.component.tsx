import { Section } from "@/components/sections";
import {
    ProfileSettingsAccountPicker,
    ProfileSettingsAppearancePicker,
    ProfileSettingsLanguagePicker,
    ProfileSettingsNotificationPicker,
} from "./components";
import { OptionsList, OptionsListItem } from "@/components/ui";
import { SubscriptionDrawer } from "@/components/drawers/subscription";
import { IconExit } from "@/components/icons";

import styles from "./styles.module.scss";

export namespace ProfileSettingsForm {
    export type Props = never;
}

export const ProfileSettingsForm = () => {
    return (
        <>
            <Section className={styles.form__gap}>
                <ProfileSettingsAccountPicker />
            </Section>

            <Section title={"Appearance"} className={styles.form__gap_lg}>
                <ProfileSettingsAppearancePicker />
            </Section>

            <Section title={"General"} className={styles.form__gap_sm}>
                <OptionsList>
                    <ProfileSettingsNotificationPicker />
                    <ProfileSettingsLanguagePicker />
                    <SubscriptionDrawer />
                </OptionsList>
            </Section>

            <Section>
                <OptionsList>
                    <OptionsListItem
                        variant={"danger"}
                        label={"Log out"}
                        contentLeft={<IconExit />}
                        contentRight={false}
                    />
                </OptionsList>
            </Section>
        </>
    );
};
