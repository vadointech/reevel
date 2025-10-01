import { getEvent } from "@/api/event/server";

import { EventDrawerContent, EventDrawerRoot } from "@/components/drawers/event";
import { InterestButton, OptionsList, OptionsListItem } from "@/components/ui";
import { ReviewsSection, ScrollSection, Section } from "@/components/sections";
import { IconReport } from "@/components/icons";

import { Event, WithContext } from "schema-dts";

import styles from "../styles/event-view-page.module.scss";
import cx from "classnames";
import { BASE_URL } from "@/auth.config";
import { seedEventUsers } from "@/features/event/utils";

export namespace EventAttendeePublicViewPage {
    export type Props = {
        eventId: string;
    };
}

export async function EventAttendeePublicViewPage({ eventId }: EventAttendeePublicViewPage.Props) {
    let event = await getEvent({ eventId });

    if(!event) {
        return null;
    }

    event = seedEventUsers(event);

    const jsonLd: WithContext<Event> = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        startDate: event.startDate.toString(),
        endDate: event.endDate?.toString(),
        location: {
            "@type": "Place",
            name: event.locationTitle,
        },
        image: [event.poster],
        description: event.description,
        offers: {
            "@type": "Offer",
            url: `${BASE_URL}/discover/event/${event.id}`,
            price: event.ticketPrice,
            availability: "https://schema.org/InStock",
            validFrom: event.startDate.toString(),
        },
    };

    return (
        <>
            <EventDrawerRoot>
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                }}
            />
        </>
    );
}
