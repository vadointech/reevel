"use client";

import { ComponentProps } from "react";

import styles from "../styles.module.scss";
import { motion, useTransform } from "motion/react";
import { Avatar } from "@/components/shared/_redesign";
import { Typography } from "@/components/ui";
import { IconLocation, IconVerified } from "@/components/icons";
import {
    PROFILE_PAGE_COVER_HEIGHT,
    PROFILE_PAGE_HEADER_HEIGHT,
} from "@/app/[locale]/(main)/profile/[slug]/_components/config";
import { useProfileContentDragYProgress } from "@/app/[locale]/(main)/profile/[slug]/_components/motion-values";

export namespace ProfileHeroUser {
    export type Props = ComponentProps<"div">;
}

export const ProfileHeroUser = ({ ...props }: ProfileHeroUser.Props) => {
    const profileContentDragYPx = useProfileContentDragYProgress();

    const avatarScale = useTransform(
        profileContentDragYPx,
        [
            0,
            PROFILE_PAGE_COVER_HEIGHT / 2,
            PROFILE_PAGE_COVER_HEIGHT - PROFILE_PAGE_HEADER_HEIGHT,
        ],
        [
            1,
            .67,
            .3,
        ],
    );
    const avatarScaleY = useTransform(
        profileContentDragYPx,
        [
            PROFILE_PAGE_COVER_HEIGHT / 2,
            PROFILE_PAGE_COVER_HEIGHT - PROFILE_PAGE_HEADER_HEIGHT,
        ],
        [
            1,
            1.1,
        ],
    );
    const avatarTranslateX = useTransform(
        profileContentDragYPx,
        [
            PROFILE_PAGE_COVER_HEIGHT / 2,
            PROFILE_PAGE_COVER_HEIGHT - PROFILE_PAGE_HEADER_HEIGHT,
        ],
        [
            0,
            25,
        ],
    );

    const userScale = useTransform(
        profileContentDragYPx,
        [
            0,
            PROFILE_PAGE_COVER_HEIGHT / 2,
        ],
        [
            1,
            .9,
        ],
    );
    const userTranslateY = useTransform(
        profileContentDragYPx,
        [
            PROFILE_PAGE_COVER_HEIGHT / 2,
            PROFILE_PAGE_COVER_HEIGHT - 74,
        ],
        [
            0,
            -50,
        ],
    );
    const userPaddingTop = useTransform(
        profileContentDragYPx,
        [
            0,
            PROFILE_PAGE_COVER_HEIGHT / 2,
            PROFILE_PAGE_COVER_HEIGHT,
        ],
        [
            6,
            4,
            0,
        ],
    );

    return (
        <>
            <motion.div
                style={{
                    scaleY: avatarScaleY,
                    scale: avatarScale,
                    translateX: avatarTranslateX,
                }}
                className={styles.hero__avatar}
            >
                <Avatar
                    image={"/assets/temp/avatar.png"}
                />
            </motion.div>
            <motion.div
                style={{
                    translateY: "100%",
                    scale: userScale,
                    paddingTop: userPaddingTop,
                }}
                className={styles.hero__info}
            >
                <motion.div
                    style={{
                        translateY: userTranslateY,
                        translateX: avatarTranslateX,
                    }}
                >
                    <div className={styles.hero__user}>
                        <Typography.h1 size={"2xl"} className={styles.hero__name}>
                            Jimmy Smith
                        </Typography.h1>
                        <IconVerified />
                    </div>

                    <div className={styles.hero__location}>
                        <IconLocation />
                        <Typography.span size={"sm"}>
                            Vinnitsa
                        </Typography.span>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};
