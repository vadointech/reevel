"use client";

import { ComponentProps } from "react";

import { motion, useTransform } from "motion/react";

import { useScrollYPx } from "../observables";
import { PROFILE_PAGE_COVER_HEIGHT, PROFILE_PAGE_HEADER_HEIGHT } from "../config";

import { Typography } from "@/components/ui";
import { Avatar } from "@/components/shared/_redesign";
import { IconArrowLeft, IconEllipsisVertical, IconVerified } from "@/components/icons";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace ProfileHeader {
    export type Props = ComponentProps<"div">;
}

export const ProfileHeader = ({ ...props }: ProfileHeader.Props) => {
    const scrollYPx = useScrollYPx();

    const headerOpacity = useTransform(
        scrollYPx,
        [
            PROFILE_PAGE_COVER_HEIGHT / 2,
            PROFILE_PAGE_COVER_HEIGHT - PROFILE_PAGE_HEADER_HEIGHT,
        ],
        [
            0,
            1,
        ],
    );
  
    return (
        <>
            <motion.div className={styles.header}>
                <div className={cx(styles.header__navigation, styles.header__navigation_overlay)}>
                    <IconArrowLeft />
                    <div />
                    <IconEllipsisVertical />
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
                    <IconEllipsisVertical />
                </motion.div>
            </motion.div>
        </>

    );
};
