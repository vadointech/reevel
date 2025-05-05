"use client";

import { ComponentProps } from "react";
import Image from "next/image";

import { motion, useTransform } from "motion/react";

import { useScrollYPx } from "../observables";
import { hexToRgba } from "@/utils/hex-to-rgba";
import { PROFILE_PAGE_COVER_HEIGHT, PROFILE_PAGE_HEADER_HEIGHT } from "../config";

import { Typography } from "@/components/ui";
import { IconInstagram, IconLocation, IconTelegram, IconTwitch, IconVerified } from "@/components/icons";
import { Avatar } from "@/components/shared/_redesign";

import styles from "./styles.module.scss";
import cx from "classnames";

export namespace ProfileHero {
    export type Props = ComponentProps<"div">;
}

export const ProfileHero = ({ ...props }: ProfileHero.Props) => {
    const scrollYPx = useScrollYPx();

    const avatarScale = useTransform(
        scrollYPx,
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
        scrollYPx,
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
        scrollYPx,
        [
            PROFILE_PAGE_COVER_HEIGHT / 2,
            PROFILE_PAGE_COVER_HEIGHT - PROFILE_PAGE_HEADER_HEIGHT,
        ],
        [
            0,
            25,
        ],
    );

    const avatarOpacity = useTransform(
        scrollYPx,
        [
            PROFILE_PAGE_COVER_HEIGHT / 2,
            PROFILE_PAGE_COVER_HEIGHT - PROFILE_PAGE_HEADER_HEIGHT,
        ],
        [
            1,
            0,
        ],
    );


    const contentHeight = useTransform(
        scrollYPx,
        [
            0,
            PROFILE_PAGE_COVER_HEIGHT / 2,
        ],
        [
            126,
            84,
        ],
    );

    const userScale = useTransform(
        scrollYPx,
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
        scrollYPx,
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
        scrollYPx,
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
                style={{ opacity: avatarOpacity }}
                className={styles.hero}
            >

                <div className={styles.hero__snaps}>
                    <div className={styles.hero__snap} />
                    <div className={styles.hero__snap} />
                </div>

                <Image
                    fill
                    src={"/assets/temp/amazon_bg.jpg"}
                    alt={"Profile Cover"}
                    className={styles.hero__cover}
                />

                <div
                    className={styles.hero__overlay}
                    style={{
                        background: `linear-gradient(
                        to top,
                        ${hexToRgba("#212529", 0)} 50%,
                        ${hexToRgba("#212529", 0.05)} 58%,
                        ${hexToRgba("#212529", 0.2)} 60%,
                        ${hexToRgba("#212529", 0.4)} 74%,
                        ${hexToRgba("#212529", .6)} 100%
                    )`,
                    }}
                />

                <div className={styles.hero__links}>
                    <div className={cx(styles.hero__link, styles.hero__link_twitch)}>
                        <IconTwitch />
                    </div>
                    <div className={cx(styles.hero__link, styles.hero__link_telegram)}>
                        <IconTelegram />
                    </div>
                    <div className={cx(styles.hero__link, styles.hero__link_inst)}>
                        <IconInstagram />
                    </div>
                </div>

                <motion.div
                    style={{ height: contentHeight }}
                    className={styles.hero__content}
                >
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
                            opacity: avatarOpacity,
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
                </motion.div>
            </motion.div>

            <motion.div
                style={{ height: contentHeight }}
            />
        </>
    );
};
