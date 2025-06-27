import { headers } from "next/headers";
import { getEvent } from "@/api/event";

import { EventDrawerContent, EventDrawerRoot } from "@/components/drawers/event";
import { InterestButton, OptionsList, OptionsListItem } from "@/components/ui";
import { ReviewsSection, ScrollSection, Section } from "@/components/sections";
import { IconReport } from "@/components/icons";

import styles from "../styles/event-view-page.module.scss";
import cx from "classnames";

export namespace EventAttendeePublicViewPage {
    export type Props = {
        eventId: string;
        callbackUrl: string;
    };
}

export async function EventAttendeePublicViewPage({ eventId, callbackUrl }: EventAttendeePublicViewPage.Props) {

    const { data: event } = await getEvent({
        nextHeaders: await headers(),
        body: { eventId },
    });

    if(!event) {
        return null;
    }

    return (
        <EventDrawerRoot callbackUrl={callbackUrl}>
            <EventDrawerContent event={event}>
                <div
                    className={cx(
                        styles.interests,
                        styles.gap,
                    )}
                >
                    <ScrollSection size={"small"}>
                        {
                            event.interests.map(interest => (
                                <InterestButton
                                    key={interest.interestId}
                                    icon={interest.interest.icon}
                                >
                                    { interest.interest.title_uk }
                                </InterestButton>
                            ))
                        }
                    </ScrollSection>
                </div>

                {/*<ScrollSection*/}
                {/*    title={"Similar interests"}*/}
                {/*    cta={"See all"}*/}
                {/*    variant={"text-accent"}*/}
                {/*    className={styles.gap}*/}
                {/*>*/}
                {/*    <CollectionCard*/}
                {/*        title="Astronomy"*/}
                {/*        location="Vinnitsa"*/}
                {/*        emoji="🔭"*/}
                {/*        primaryColor="#0A192F"*/}
                {/*        secondaryColor="#23395D"*/}
                {/*    />*/}
                {/*    <CollectionCard*/}
                {/*        title="Bouling"*/}
                {/*        location="Vinnitsa"*/}
                {/*        emoji="🎳"*/}
                {/*        primaryColor="#A54F4F"*/}
                {/*        secondaryColor="#6A3232"*/}
                {/*    />*/}
                {/*    <CollectionCard*/}
                {/*        title="Farming"*/}
                {/*        location="Vinnitsa"*/}
                {/*        emoji="🚜"*/}
                {/*        primaryColor="#7D9A5D"*/}
                {/*        secondaryColor="#4F6F3A"*/}
                {/*    />*/}
                {/*</ScrollSection>*/}

                {/*<ScrollSection*/}
                {/*    title={"More from Jimmy Smith"}*/}
                {/*    cta={"See all"}*/}
                {/*    variant={"text-accent"}*/}
                {/*    className={styles.gap}*/}
                {/*>*/}
                {/*    <EventCard*/}
                {/*        size={"small"}*/}
                {/*        poster={"/assets/temp/poster5.png"}*/}
                {/*        primaryColor={"#AB002F"}*/}
                {/*        title={"Happy Valentine's Day Party"}*/}
                {/*        location={"ТЦ SkyPark"}*/}
                {/*        type={"Public"}*/}
                {/*    />*/}
                {/*</ScrollSection>*/}

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
