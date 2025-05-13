"use client"

import styles from "../styles.module.scss";
import cx from "classnames";
import { UploadDrawer } from "@/components/drawers/upload";
import { Header } from "@/components/shared/header";
import { Container } from "@/components/ui";
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger, Section } from "@/components/shared/_redesign";
import { OptionItem, Options } from "@/components/shared/options";
import { Back, IconDark, IconDollar, IconNotification, IconStar, IconWorld } from "@/components/icons";
import { Toggle } from "@/components/shared/toggle";
import { useState } from "react";
import { IconExit } from "@/components/icons/exit";

export default function PrivateProfileSettingsPage() {

    const [toggled, setToggled] = useState(false)

    return (
        <Container className={styles.settings}>
            <Header
                title="Settings"
                size="large"
            />

            <OptionItem className={styles.settings__profile} label="Jimmy Smith" description="jimmy_smith@gmail.com" icon={"/assets/temp/avatar.png"}>
                <Back width={7} height={14} style={{ rotate: "180deg" }} />
            </OptionItem>

            <Section title="Appearance" className={styles.settings__appearance}>
                <OptionItem label="Dark mode" icon={<IconDark width={22} height={22} />} >
                    <Toggle setToggled={() => setToggled(!toggled)} toggled={toggled} />
                </OptionItem>
            </Section>

            <Section title="General" className={styles.settings__general}>
                <Options>
                    <OptionItem label="Notifications" description="All" icon={<IconNotification width={22} height={22} />} >
                        <Back width={7} height={14} style={{ rotate: "180deg" }} />
                    </OptionItem>
                    <OptionItem label="Language" description="System" icon={<IconWorld width={22} height={22} />} >
                        <Back width={7} height={14} style={{ rotate: "180deg" }} />
                    </OptionItem>
                    <OptionItem label="Subscription" description="System" icon={<IconStar width={22} height={22} fill="#212629" />} >
                        <Back width={7} height={14} style={{ rotate: "180deg" }} />
                    </OptionItem>
                </Options>
                <Drawer staticPointKey="Medium">
                    <DrawerTrigger className={styles.test}>
                        <OptionItem label="Subscription" danger icon={<IconExit width={20} height={22} fill="#F62816" />}> </OptionItem>
                    </DrawerTrigger>
                    <DrawerBody>
                        <DrawerContent className={styles.drawer}>
                        </DrawerContent>
                    </DrawerBody>
                </Drawer>
            </Section>

        </Container>
    );
}