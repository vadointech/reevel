import { EventDrawerContent, EventDrawerRoot } from "@/components/drawers/event";
import { CollectionCard, EventCard, InterestButton, OptionsList, OptionsListItem } from "@/components/ui";
import { ReviewsSection, ScrollSection, Section } from "@/components/sections";
import { IconReport } from "@/components/icons";

import { EventVisibility } from "@/entities/event";

import styles from "../styles/event-view-page.module.scss";
import cx from "classnames";

export namespace EventAttendeePrivateViewPage {
    export type Props = never;
}

export function EventAttendeePrivateViewPage() {
    return (
        <EventDrawerRoot>
            <EventDrawerContent
                id={"1"}
                title={"Happy Valentine's Day Party"}
                poster={"/assets/temp/poster5.png"}
                primaryColor={"#AB002F"}
                location={{
                    type: "Point",
                    coordinates: [0, 0],
                }}
                ticketsAvailable={17}
                ticketPrice={378}
                visibility={EventVisibility.PRIVATE}
                dateTime={new Date()}
                host={{
                    id: "7",
                    userId: "13",
                    completed: "true",
                    picture: "/assets/temp/avatar.png",
                    fullName: "Jimmi Smith",
                }}
                interests={[]}
                attendees={[
                    {
                        id: "1",
                        userId: "13",
                        completed: "true",
                        picture: "/assets/temp/avatar.png",
                        fullName: "Jimmi Smith",
                    },
                    {
                        id: "7",
                        userId: "13",
                        completed: "true",
                        picture: "/assets/temp/avatar.png",
                        fullName: "Jimmi Smith",
                    },
                    {
                        id: "3",
                        userId: "13",
                        completed: "true",
                        picture: "/assets/temp/avatar.png",
                        fullName: "Jimmi Smith",
                    },
                    {
                        id: "2",
                        userId: "13",
                        completed: "true",
                        picture: "/assets/temp/avatar.png",
                        fullName: "Jimmi Smith",
                    },
                ]}
                tickets={[]}
                description={"Contrary to popular belief, Lorem Ipsum is not simply random text-area. It has roots in a piece of classical Latin literature from 45 BC, makingontrary to popular belief, Lorem Ipsum is not simply random text-area. It has roots in a piece of classical Latin literature from 45 BC, making"}
            >
                <div
                    className={cx(
                        styles.interests,
                        styles.gap,
                    )}
                >
                    <ScrollSection size={"small"}>
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
                </div>

                <ScrollSection
                    title={"Similar interests"}
                    cta={"See all"}
                    variant={"text-accent"}
                    className={styles.gap}
                >
                    <CollectionCard
                        title="Astronomy"
                        location="Vinnitsa"
                        emoji="🔭"
                        primaryColor="#0A192F"
                        secondaryColor="#23395D"
                    />
                    <CollectionCard
                        title="Bouling"
                        location="Vinnitsa"
                        emoji="🎳"
                        primaryColor="#A54F4F"
                        secondaryColor="#6A3232"
                    />
                    <CollectionCard
                        title="Farming"
                        location="Vinnitsa"
                        emoji="🚜"
                        primaryColor="#7D9A5D"
                        secondaryColor="#4F6F3A"
                    />
                </ScrollSection>

                <ScrollSection
                    title={"More from Jimmy Smith"}
                    cta={"See all"}
                    variant={"text-accent"}
                    className={styles.gap}
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
                    variant={"text-accent"}
                    className={styles.gap}
                />

                <Section container>
                    <OptionsList>
                        <OptionsListItem
                            label={"Report"}
                            contentLeft={<IconReport />}
                        />
                    </OptionsList>
                </Section>
            </EventDrawerContent>
        </EventDrawerRoot>
    );
}
