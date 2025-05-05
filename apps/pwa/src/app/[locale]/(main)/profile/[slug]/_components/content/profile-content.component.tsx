"use client";

import { ComponentProps, useRef } from "react";
import { useScroll } from "motion/react";

import { ProfileHeader, ProfileHero } from "..";
import { setScrollYPx } from "../observables";

import styles from "./styles.module.scss";

export namespace ProfilePageContent {
    export type Props = ComponentProps<"div">;
}

export const ProfilePageContent = ({ ...props }: ProfilePageContent.Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({
        container: containerRef,
    });

    setScrollYPx(scrollY);

    return (
        <div ref={containerRef} className={styles.profile}>

            <ProfileHeader />

            <ProfileHero />

            <div className={styles.content}>

            </div>
        </div>
    );
};
