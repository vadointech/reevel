import { EventDrawerRoot, EventDrawerContent } from "@/components/drawers/event";

import { ReviewsSection, ScrollSection } from "@/components/sections";
import { InterestButton, Section } from "@/components/shared/_redesign";
import { CollectionCard } from "@/components/shared/collection-card";
import { EventCard } from "@/components/shared/event-card";
import { OptionItem, Options } from "@/components/shared/options";
import { IconReport } from "@/components/icons";

import styles from "./styles.module.scss";
import cx from "classnames";

export default function Page() {
    return (
        <>
            <EventDrawerRoot>
                <EventDrawerContent
                    poster={"/assets/temp/poster5.png"}
                    primaryColor={"#AB002F"}
                    title={"Happy Valentine's Day Party"}
                    location={"ТЦ SkyPark"}
                    date={new Date()}
                    price={378}
                    currency={"₴"}
                    host={{
                        name: "Jimmy Smith",
                        avatar: "/assets/temp/avatar.png",
                    }}
                    attendees={[
                        { id: "1", userId: "1", completed: "true", picture: "http://localhost:3000/assets/temp/valentine.png" },
                        { id: "2", userId: "2", completed: "true", picture: "http://localhost:3000/assets/temp/poster1.jpg" },
                        { id: "3", userId: "3", completed: "true", picture: "http://localhost:3000/assets/temp/poster2.png" },
                        { id: "4", userId: "4", completed: "true", picture: "http://localhost:3000/assets/temp/poster3.png" },
                        { id: "5", userId: "5", completed: "true", picture: "http://localhost:3000/assets/temp/poster4.png" },
                    ]}
                    attendeesCount={150}
                    description={"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, makingontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making"}
                >
                    <div
                        className={cx(
                            styles.page__interests,
                            styles.page__gap,
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
                        className={styles.page__gap}
                    >
                        <CollectionCard
                            title="Astronomy"
                            city="Vinnitsa"
                            emoji="🔭"
                            backgroundText="Astronomy"
                            colorFrom="#0A192F"
                            colorTo="#23395D"
                        />
                        <CollectionCard
                            title="Bouling"
                            city="Vinnitsa"
                            emoji="🎳"
                            backgroundText="Bouling"
                            colorFrom="#A54F4F"
                            colorTo="#6A3232"
                        />
                        <CollectionCard
                            title="Farming"
                            city="Vinnitsa"
                            emoji="🚜"
                            backgroundText="Farming"
                            colorFrom="#7D9A5D"
                            colorTo="#4F6F3A"
                        />
                    </ScrollSection>

                    <ScrollSection
                        title={"More from Jimmy Smith"}
                        cta={"See all"}
                        className={styles.page__gap}
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
                        className={styles.page__gap}
                    />

                    <Section container>
                        <Options>
                            <OptionItem
                                danger
                                icon={<IconReport />}
                                label={"Report"}
                            />
                        </Options>
                    </Section>
                </EventDrawerContent>
            </EventDrawerRoot>
        </>
    );
}