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
    };
}

export async function EventAttendeePublicViewPage({ eventId }: EventAttendeePublicViewPage.Props) {

    const { data: event } = await getEvent({
        nextHeaders: await headers(),
        body: { eventId },
    });

    if(!event) {
        return null;
    }

    return (
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
    );
}
