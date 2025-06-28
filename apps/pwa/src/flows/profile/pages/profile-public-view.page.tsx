import { ProfileHero } from "../modules/hero";
import { ProfilePageHeader } from "../modules/header";
import { ProfilePageContent } from "../modules/content";
import { Container, InterestButton } from "@/components/ui";
import { ReviewsSection, ScrollSection } from "@/components/sections";

import styles from "../styles/profile-page.module.scss";

export namespace ProfilePublicViewPage {
    export type Props = never;
}

export function ProfilePublicViewPage() {
    return (
        <>
            <ProfilePageHeader overlayVariant={"light"} variant={"public"} />
            <ProfilePageContent>
                <ProfileHero />
                <div className={styles.content}>
                    <Container className={styles.content__gap_sm}>
                        <p className={styles.content__description}>
                            Pick the things you’re passionate about so we can show events that match your passionate interests.
                            <span className={styles.content__description_more}>
                                More
                            </span>
                        </p>
                    </Container>

                    <ScrollSection
                        size={"small"}
                        title={"Common interests"}
                        cta={"See all"}
                        variant={"text-accent"}
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
                        variant={"text-accent"}
                        className={styles.content__gap}
                    >
                        {/*<EventCard*/}
                        {/*    size={"small"}*/}
                        {/*    poster={"/assets/temp/poster5.png"}*/}
                        {/*    primaryColor={"#AB002F"}*/}
                        {/*    title={"Happy Valentine's Day Party"}*/}
                        {/*    location={"ТЦ SkyPark"}*/}
                        {/*    type={"Public"}*/}
                        {/*/>*/}
                        {/*<EventCard*/}
                        {/*    size={"small"}*/}
                        {/*    poster={"/assets/temp/poster5.png"}*/}
                        {/*    primaryColor={"#AB002F"}*/}
                        {/*    title={"Happy Valentine's Day Party"}*/}
                        {/*    location={"ТЦ SkyPark"}*/}
                        {/*    type={"Public"}*/}
                        {/*/>*/}
                        {/*<EventCard*/}
                        {/*    size={"small"}*/}
                        {/*    poster={"/assets/temp/poster5.png"}*/}
                        {/*    primaryColor={"#AB002F"}*/}
                        {/*    title={"Happy Valentine's Day Party"}*/}
                        {/*    location={"ТЦ SkyPark"}*/}
                        {/*    type={"Public"}*/}
                        {/*/>*/}
                    </ScrollSection>

                    <ReviewsSection
                        title={"Rating & reviews"}
                        cta={"See all"}
                        variant={"text-accent"}
                        rating={4.5}
                        count={578}
                    />
                </div>
            </ProfilePageContent>
        </>
    );
}
