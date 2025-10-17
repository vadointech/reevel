import { getEvent } from "@/api/event";

import { EventDrawerContent, EventDrawerRoot } from "@/components/drawers/event";
import { InterestButton, OptionsList, OptionsListItem } from "@/components/ui";
import { ReviewsSection, ScrollSection, Section } from "@/components/sections";
import { IconReport } from "@/components/icons";
import styles from "../styles/event-view-page.module.scss";
import cx from "classnames";
import { ReportDrawer } from "@/components/drawers/report";
import { EventSeoCardGroup, EventSeoJsonSchema } from "@/components/ui/cards/event-seo-card";
import { API_URL } from "@/config/env.config";
import { notFound } from "next/navigation";

export namespace EventAttendeePublicViewPage {
    export type Props = {
        eventId: string;
    };
}

export async function EventAttendeePublicViewPage({ eventId }: EventAttendeePublicViewPage.Props) {
    const { data: event } = await getEvent({
        body: { eventId },
        baseURL: API_URL,
    });

    if(!event) {
        return notFound();
    }

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
                            <ReportDrawer eventId={event.id}>
                                <OptionsListItem
                                    label={"Report"}
                                    contentLeft={<IconReport />}
                                />
                            </ReportDrawer>
                        </OptionsList>
                    </Section>
                </EventDrawerContent>
            </EventDrawerRoot>
            <EventSeoCardGroup title={event.title} event={event} />
            <EventSeoJsonSchema event={event} />
        </>
    );
}
