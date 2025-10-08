"use client";

import { ReactNode } from "react";

import { motion, useTransform } from "motion/react";

import { PROFILE_PAGE_COVER_HEIGHT, PROFILE_PAGE_HEADER_HEIGHT } from "../config";
import { useProfileContentDragYProgress } from "../motion-values";

import { IconArrowLeft, IconEllipsisVertical, IconSettings, IconVerified } from "@/components/icons";
import { Avatar } from "@/components/ui";
import Link from "next/link";

import { useProfile } from "../profile-context";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace ProfilePageHeader {
    export type Variant = "public" | "private";
    export type OverlayVariant = "light" | "dark";
    export type Props = {
        variant: Variant;
        overlayVariant?: OverlayVariant;
    };
}

export const ProfilePageHeader = ({
    variant,
    overlayVariant = "light",
}: ProfilePageHeader.Props) => {
    const user = useProfile();

    const profileContentDragYPx = useProfileContentDragYProgress();

    const headerOpacity = useTransform(
        profileContentDragYPx,
        [
            PROFILE_PAGE_COVER_HEIGHT / 2,
            PROFILE_PAGE_COVER_HEIGHT - PROFILE_PAGE_HEADER_HEIGHT,
        ],
        [
            0,
            1,
        ],
    );

    const IconControlRight: Record<ProfilePageHeader.Variant, ReactNode> = {
        private: <IconSettings className={cx(styles.header__navigation_control, styles.header__navigation_control_right)} />,
        public: <IconEllipsisVertical className={cx(styles.header__navigation_control, styles.header__navigation_control_right)} />,
    };

    return (
        <motion.div className={styles.header}>
            <div
                className={cx(
                    styles.header__navigation,
                    styles.header__navigation_overlay,
                    styles[`header__navigation_overlay_${overlayVariant}`],
                )}
            >
                <Link href={"/discover"}>
                    <IconArrowLeft className={styles.header__navigation_control} />
                </Link >
                <div />
                {IconControlRight[variant]}
            </div>
            <motion.div
                style={{ opacity: headerOpacity }}
                className={styles.header__navigation}
            >
                <Link href={"/discover"}>
                    <IconArrowLeft className={styles.header__navigation_control} />
                </Link >
                <div className={styles.header__info}>
                    <Avatar image={user?.picture || "/assets/temp/avatar.png"} />
                    <div className={styles.header__user}>
                        <h2 className={styles.header__name}>
                            {user?.fullName}
                        </h2>
                        <IconVerified />
                    </div>
                </div>
                {variant === "private"
                    ? <Link href={"/profile/settings"}>{IconControlRight[variant]}</Link>
                    : IconControlRight[variant]
                }
            </motion.div>
        </motion.div>
    );
};
