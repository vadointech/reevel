import { ProfileHero } from "../modules/hero";
import { ProfilePageHeader } from "../modules/header";
import { ProfilePageContent } from "../modules/content";
import { Button, Container, EventCard, InterestButton } from "@/components/ui";
import { ReviewsSection, ScrollSection } from "@/components/sections";

import styles from "../styles/profile-page.module.scss";
import cx from "classnames";
import { ProfileProvider } from "../modules/profile-context";
import { getCurrentUserEvents, getCurrentUserInterests, getCurrentUserProfile } from "@/api/user/server";

export namespace ProfilePrivateViewPage {
    export type Props = never;
}

export async function ProfilePrivateViewPage() {
    const [user, interests, events] = await Promise.all([
        getCurrentUserProfile(),
        getCurrentUserInterests(),
        getCurrentUserEvents(),
    ]);

    return (
        <>
            <ProfileProvider user={user}>
                <ProfilePageHeader overlayVariant={"light"} variant={"private"} />
                <ProfilePageContent>
                    <ProfileHero />
                    <div className={styles.content}>
                        <Container className={styles.content__gap_sm}>
                            <p className={styles.content__description}>
                                {user?.bio}
                                <span className={styles.content__description_more}>
                                    More
                                </span>
                            </p>
                        </Container>

                        <Container
                            className={cx(
                                styles.content__controls,
                                styles.content__gap,
                            )}
                        >
                            <Button variant={"secondary-muted"} size={"small"} href="profile/edit">
                                Edit profile
                            </Button>
                            <Button variant={"secondary-muted"} size={"small"}>
                                Share profile
                            </Button>
                        </Container>

                        <ScrollSection
                            size={"small"}
                            title={"My Interests"}
                            cta={user?.interests?.length ? "See all" : false}
                            className={styles.content__gap}
                        >
                            {
                                interests?.length ? interests.map((event, index) => (
                                    <InterestButton
                                        key={index}
                                        icon={event.icon}
                                    >
                                        {event.title_en}
                                    </InterestButton>
                                ))
                                    : <div>Add your interests</div>
                            }
                        </ScrollSection>

                        <ScrollSection
                            title={"My Events"}
                            cta={"See all"}
                            className={styles.content__gap}
                        >
                            {events.length ? events.map((event, i) => (
                                <EventCard
                                    key={i}
                                    size={"small"}
                                    event={event}
                                />
                            ))

                                : <div>You haven't created events yet</div>
                            }
                        </ScrollSection>

                        <ReviewsSection
                            title={"Rating & reviews"}
                            cta={"See all"}
                            rating={4.5}
                            count={578}
                        />
                    </div>
                </ProfilePageContent>
            </ProfileProvider>
        </>
    );
}
