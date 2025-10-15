"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "@/features/session";
import { GetHighlightsQuery } from "@/features/discover/queries";
import { ScrollSection, ScrollSectionSkeleton } from "@/components/sections";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { Link } from "@/i18n/routing";
import { EventCard, EventCardSkeleton } from "@/components/ui";
import { EventEntity } from "@/entities/event";
import { CitiesEntity } from "@/entities/cities";
import { paginationPlaceholder } from "@/entities/placeholders";
import { observer } from "mobx-react-lite";

import styles from "../styles/discover-drawer.module.scss";
import cx from "classnames";

export namespace HighlightsCollectionSlider {
    export type Props = ScrollSection.Props & {
        cityInit?: CitiesEntity;
        eventsInit: EventEntity[];
    };
}

export const HighlightsCollectionSlider = observer(({
    cityInit,
    eventsInit,
    className,
    ...props
}: HighlightsCollectionSlider.Props) => {
    const session = useSessionContext();

    const city = useMemo(() => {
        if(session.store.user) {
            return session.store.user.profile.location;
        }
        return cityInit;
    }, []);

    const { data, isFetching } = useQuery({
        enabled: session.store.authenticated,
        placeholderData: {
            data: eventsInit,
            pagination: paginationPlaceholder,
        },
        ...GetHighlightsQuery({
            cityId: city?.id,
        }),
    });

    const isLoading = isFetching || session.store.loading;

    if(isLoading) {
        return (
            <ScrollSectionSkeleton
                title
                className={cx(styles.drawer__gap, className)}
            >
                {
                    [...new Array(3).keys()].map((item) => (
                        <EventCardSkeleton key={`event-card-skeleton-${item}`} size={"small"} />
                    ))
                }
            </ScrollSectionSkeleton>
        );
    }

    return (
        <ScrollSection
            title={`Don’t Miss in ${city?.name}`}
            cta={"See all"}
            variant={"text-accent"}
            ctaHref={DiscoverStaticCollections.Highlights}
            className={cx(styles.drawer__gap, className)}
            {...props}
        >
            {
                data?.data.map(event => (
                    <Link
                        key={event.id}
                        href={DiscoverStaticCollections.Root + "/event/" + event.id}
                    >
                        <EventCard
                            size={"small"}
                            displayMode={"date"}
                            event={event}
                        />
                    </Link>
                ))
            }
        </ScrollSection>
    );
});