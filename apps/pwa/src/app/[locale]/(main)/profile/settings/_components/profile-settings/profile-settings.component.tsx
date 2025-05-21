"use client"

import { SubscriptionDrawer } from "@/components/drawers/subscription-drawer";
import { IconStar, Back, IconNotification } from "@/components/icons";
import { IconExit } from "@/components/icons/exit";
import { OptionsList, OptionsListItem, Section } from "@/components/shared/_redesign";
import { ComponentProps } from "react";

import { AccountDrawer } from "./pickers/account-drawer";
import { AppearanceSection } from "./pickers/appearance-section";
import { LanguageDrawer } from "./pickers/language-drawer";
import { NotificationDrawer } from "./pickers/notification-drawer";

import styles from "./styles.module.scss"
import { useSessionStore } from "@/features/session";

export namespace ProfileSettings {
    export type Props = ComponentProps<"div">
}


export const ProfileSettings = ({

}: ProfileSettings.Props) => {
    const session = useSessionStore()

    return (
        <div>

            <div className={styles.gap}>
                <AccountDrawer />
            </div>
            <div className={styles.gap_lg}>
                <AppearanceSection />
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
                    onClick={() => session.logout()}
                    contentLeft={<IconExit width={20} height={22} fill="#F62816" />}
                    contentRight={false}
                    variant={"warn"}
                />
            </OptionsList>
        </div>
    )
}