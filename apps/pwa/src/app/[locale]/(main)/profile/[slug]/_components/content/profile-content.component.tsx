"use client";

import { ComponentProps, useEffect, useRef } from "react";
import { motion, PanInfo, useAnimation } from "motion/react";

import styles from "./styles.module.scss";
import { ProfileHeader, ProfileHero } from "@/app/[locale]/(main)/profile/[slug]/_components";
import { profileContentDragYPx } from "@/app/[locale]/(main)/profile/[slug]/_components/motion-values";
import { Container, Typography } from "@/components/ui";
import { ReviewsSection, ScrollSection } from "@/components/sections";
import { InterestButton } from "@/components/shared/_redesign";
import { EventCard } from "@/components/shared/event-card";
import { PROFILE_PAGE_COVER_HEIGHT } from "../config";
import { Transition } from "motion";

const TRANSITION_PARAMS: Transition = {
    type: "tween",
    duration: 0.4,
    ease: "easeOut",
};

export namespace ProfilePageContent {
    export type Props = ComponentProps<"div">;
}

export const ProfilePageContent = ({ ...props }: ProfilePageContent.Props) => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const animate = useAnimation();
    const hasSnapped = useRef(false);
    const direction = useRef<"top" | "bottom">("top");

    useEffect(() => {
        const unsubscribe = profileContentDragYPx.on("change", (value) => {
            const position = value * -1;

            if(direction.current === "top" && !hasSnapped.current) {
                if(position >= PROFILE_PAGE_COVER_HEIGHT / 2 && position < PROFILE_PAGE_COVER_HEIGHT) {
                    hasSnapped.current = true;
                    animate.start({ y: -PROFILE_PAGE_COVER_HEIGHT }, TRANSITION_PARAMS);
                }
                return;
            }

            if(direction.current === "bottom" && hasSnapped.current) {
                if(position < PROFILE_PAGE_COVER_HEIGHT) {
                    hasSnapped.current = false;
                    animate.start({ y: 0 }, TRANSITION_PARAMS);
                }
            }
        });

        return () => unsubscribe();
    }, []);


    const handleDragEnd = (_: any, info: PanInfo) => {
        if(info.velocity.y > 0) {
            direction.current = "bottom";
        } else {
            direction.current = "top";
        }
    };

    return (
        <div ref={scrollerRef} className={styles.profile}>
            <ProfileHeader />
            <motion.div

                drag={"y"}
                style={{ y: profileContentDragYPx }}
                animate={animate}
                dragDirectionLock
                onDragEnd={handleDragEnd}
                dragConstraints={scrollerRef}
            >
                <ProfileHero />
                <div className={styles.content}>
                    <Container className={styles.content__gap}>
                        <div className={styles.content__description}>
                            <Typography.p size={"sm"}>
                                Pick the things you’re passionate about so we can show events that match your passionate interests.
                            </Typography.p>
                            <Typography.span size={"sm"} className={styles.content__description_more}>
                                More
                            </Typography.span>
                        </div>
                    </Container>

                    <ScrollSection
                        size={"small"}
                        title={"Common Interests"}
                        cta={"See all"}
                        className={styles.content__gap}
                    >
                        {
                            Array.from({ length: 8 }).map((_, index) => (
                                <InterestButton
                                    key={index}
                                    icon={"🥊"}
                                >
                                    Boxing
                                </InterestButton>
                            ))
                        }
                    </ScrollSection>

                    <ScrollSection
                        title={"Top Events"}
                        cta={"See all"}
                        className={styles.content__gap}
                    >
                        <EventCard
                            size={"small"}
                            poster={"/assets/temp/poster5.png"}
                            primaryColor={"#AB002F"}
                            title={"Happy Valentine's Day Party"}
                            location={"ТЦ SkyPark"}
                            type={"Public"}
                        />
                        <EventCard
                            size={"small"}
                            poster={"/assets/temp/poster5.png"}
                            primaryColor={"#AB002F"}
                            title={"Happy Valentine's Day Party"}
                            location={"ТЦ SkyPark"}
                            type={"Public"}
                        />
                        <EventCard
                            size={"small"}
                            poster={"/assets/temp/poster5.png"}
                            primaryColor={"#AB002F"}
                            title={"Happy Valentine's Day Party"}
                            location={"ТЦ SkyPark"}
                            type={"Public"}
                        />
                    </ScrollSection>

                    <ReviewsSection
                        title={"Rating & reviews"}
                        cta={"See all"}
                        rating={4.5}
                        count={578}
                        // className={styles.page__gap}
                    />
                </div>
            </motion.div>


        </div>
    );
};
