"use client";

import { ComponentProps } from "react";

import { ProfileHeader, ProfileHero, ProfileContentScroller } from "..";
import { Container, Typography } from "@/components/ui";
import { ReviewsSection, ScrollSection } from "@/components/sections";
import { InterestButton } from "@/components/shared/_redesign";
import { EventCard } from "@/components/shared/event-card";

import styles from "./styles.module.scss";

export namespace ProfilePageContent {
    export type Props = ComponentProps<"div">;
}

export const ProfilePageContent = ({ ...props }: ProfilePageContent.Props) => {
    return (
        <>
            <ProfileHeader />
            <ProfileContentScroller>
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
                    />
                </div>
            </ProfileContentScroller>
        </>
    );
};
