"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import styles from "./styles.module.scss";

import { Drawer, DrawerBody, DrawerContent } from "@/components/shared/drawer";

import { InterestEntity } from "@/entities/interests";
import { OnboardingTextBlock } from "@/app/[locale]/(main)/onboarding/_components";
import { useEventStore } from "@/features/event";
import { Back } from "@/components/icons";
import { Link } from "@/i18n/routing";


export namespace ScheduledDrawer {
    export type Props = {
        open?: boolean;
        onClose?: () => void;
    };
}

export const ScheduledDrawer = ({ open, onClose }: ScheduledDrawer.Props) => {
    const eventStore = useEventStore()

    return (
        <Drawer open={open} defaultPoint={"middle"}>
            <DrawerBody>
                <DrawerContent>
                    <OnboardingTextBlock
                        title={`Are you sure?`}
                        subtitle={`You already have an event scheduled for ${eventStore.dateStore.startMonth} ${eventStore.dateStore.startDate} at 11:40`}
                    />

                    <div className={styles.options}>
                        <div className={styles.options__option} onClick={onClose}>
                            <span>Change time</span>
                            <Back width={7} height={14} />
                        </div>
                        <div className={styles.options__option}>
                            <span>Skip step</span>
                            <Back width={7} height={14} />
                        </div>
                        <Link className={styles.options__option} href={'/'}>
                            <span className={styles.options__option_draft}>Save as draft and leave</span>
                            <Back width={7} height={14} />
                        </Link>
                    </div>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    )
};
