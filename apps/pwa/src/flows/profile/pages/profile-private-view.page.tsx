"use client";

import { ProfileHero } from "../modules/hero";
import { ProfilePageHeader } from "../modules/header";
import { ProfilePageContent } from "../modules/content";
import { Button, Container, EventCard, InterestButton, Placeholder } from "@/components/ui";
import { ScrollSection } from "@/components/sections";

import styles from "../styles/profile-page.module.scss";
import cx from "classnames";
import { ProfileProvider } from "../modules/profile-context";
import { useQuery } from "@tanstack/react-query";
import { GetCurrentUserEventsQuery, GetCurrentUserProfileQuery } from "@/features/profile/queries";
import { IconCalendarCross } from "@/components/icons";
import { CreateEventDrawer } from "@/components/drawers/create-event";

export namespace ProfilePrivateViewPage {
    export type Props = never;
}

export function ProfilePrivateViewPage() {
    const { data: profile } = useQuery(GetCurrentUserProfileQuery());
    const { data: events } = useQuery(GetCurrentUserEventsQuery());

    if(!profile) {
        return null;
    }
    return (
        <ProfileProvider user={profile}>
            <ProfilePageHeader overlayVariant={"light"} variant={"private"} />
            <ProfilePageContent>
                <ProfileHero />
                <div className={styles.content}>
                    <Container className={styles.content__gap_sm}>
                        <p className={styles.content__description}>
                            {profile?.bio}
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
                        cta={profile?.interests?.length ? "See all" : false}
                        className={styles.content__gap}
                    >
                        {
                            profile.interests?.length ? profile.interests.map((event, index) => (
                                <InterestButton
                                    key={index}
                                    icon={event.interest.icon}
                                >
                                    {event.interest.title_en}
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
                        {
                            events?.length ? events.map((event, i) => (
                                <EventCard
                                    key={i}
                                    size={"small"}
                                    event={event}
                                />
                            )) : (
                                <Placeholder
                                    size={"small"}
                                    icon={<IconCalendarCross />}
                                    title={"You’re not hosting anything"}
                                    description={"Create an event and invite others"}
                                >
                                    <CreateEventDrawer>
                                        <Button
                                            size={"xsmall"}
                                            variant={"secondary-muted"}
                                        >
                                            New Event
                                        </Button>
                                    </CreateEventDrawer>
                                </Placeholder>
                            )
                        }
                    </ScrollSection>

                    {/*<ReviewsSection*/}
                    {/*    title={"Rating & reviews"}*/}
                    {/*    cta={"See all"}*/}
                    {/*    rating={4.5}*/}
                    {/*    count={578}*/}
                    {/*/>*/}
                </div>
            </ProfilePageContent>
        </ProfileProvider>
    );
}
