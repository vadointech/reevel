"use client";

import { motion, useTransform } from "motion/react";

import { useProfileContentDragYProgress } from "../../motion-values";

import {
    PROFILE_PAGE_COVER_HEIGHT,
    PROFILE_PAGE_HEADER_HEIGHT,
} from "../../config";

import { IconLocation, IconVerified } from "@/components/icons";

import styles from "../styles.module.scss";
import { Avatar } from "@/components/ui";

export namespace ProfileHeroUser {
    export type Props = never;
}

export const ProfileHeroUser = () => {
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
                <Avatar image={"/assets/temp/avatar.png"} />
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
                        <h1 className={styles.hero__name}>
                            Jimmy Smith
                        </h1>
                        <IconVerified />
                    </div>

                    <div className={styles.hero__location}>
                        <IconLocation />
                        Vinnitsa
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};
