"use client";

import { ComponentProps } from "react";

import { motion, useTransform } from "motion/react";

import { useProfileContentDragYProgress } from "../motion-values";
import { PROFILE_PAGE_COVER_HEIGHT, PROFILE_PAGE_HEADER_HEIGHT } from "../config";

import { ProfileHeroCover, ProfileHeroLinks, ProfileHeroUser } from "./primitives";

import styles from "./styles.module.scss";

export namespace ProfileHero {
    export type Props = ComponentProps<"div">;
}

export const ProfileHero = ({ ...props }: ProfileHero.Props) => {
    const profileContentDragYPx = useProfileContentDragYProgress();

    const contentHeight = useTransform(
        profileContentDragYPx,
        [
            0,
            PROFILE_PAGE_COVER_HEIGHT / 2,
            PROFILE_PAGE_COVER_HEIGHT,
        ],
        [
            126,
            84,
            PROFILE_PAGE_HEADER_HEIGHT,
        ],
    );

    const heroOpacity = useTransform(
        profileContentDragYPx,
        [
            PROFILE_PAGE_COVER_HEIGHT / 2,
            PROFILE_PAGE_COVER_HEIGHT - PROFILE_PAGE_HEADER_HEIGHT,
        ],
        [
            1,
            0,
        ],
    );

    return (
        <>
            <motion.div
                style={{
                    opacity: heroOpacity,
                    height: PROFILE_PAGE_COVER_HEIGHT,
                }}
                className={styles.hero}
            >
                <ProfileHeroCover image={"/assets/temp/amazon_bg.jpg"} />

                <ProfileHeroLinks />

                <motion.div
                    style={{ height: contentHeight }}
                    className={styles.hero__content}
                >
                    <ProfileHeroUser />
                </motion.div>
            </motion.div>

            <motion.div
                style={{ height: contentHeight }}
            />
        </>
    );
};
