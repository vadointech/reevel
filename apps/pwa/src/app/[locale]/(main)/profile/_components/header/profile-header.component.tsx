"use client";

import { ReactNode } from "react";

import { motion, useTransform } from "motion/react";

import { PROFILE_PAGE_COVER_HEIGHT, PROFILE_PAGE_HEADER_HEIGHT } from "../config";
import { useProfileContentDragYProgress } from "../motion-values";

import { Typography } from "@/components/ui";
import { Avatar } from "@/components/shared/_redesign";
import { IconArrowLeft, IconEllipsisVertical, IconSettings, IconVerified } from "@/components/icons";

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

    const IconControls: Record<ProfilePageHeader.Variant, ReactNode> = {
        private: <IconSettings className={styles.header__navigation_control} />,
        public: <IconEllipsisVertical className={styles.header__navigation_control} />,
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
                <IconArrowLeft />
                <div />
                { IconControls[variant] }
            </div>
            <motion.div
                style={{ opacity: headerOpacity }}
                className={styles.header__navigation}
            >
                <IconArrowLeft />
                <div className={styles.header__info}>
                    <Avatar
                        image={"/assets/temp/avatar.png"}
                    />
                    <div className={styles.header__user}>
                        <Typography.h2 className={styles.header__name} size={"lg"}>
                            Jimmy Smith
                        </Typography.h2>
                        <IconVerified />
                    </div>
                </div>
                { IconControls[variant] }
            </motion.div>
        </motion.div>
    );
};
