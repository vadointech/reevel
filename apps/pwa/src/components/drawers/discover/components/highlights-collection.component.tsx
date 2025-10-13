"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "@/features/session";
import { GetHighlightsQuery } from "@/features/discover/queries";
import { ScrollSection } from "@/components/sections";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { Link } from "@/i18n/routing";
import { EventCard } from "@/components/ui";
import { EventEntity } from "@/entities/event";
import { CitiesEntity } from "@/entities/cities";
import { paginationPlaceholder } from "@/entities/placeholders";

import styles from "../styles/discover-drawer.module.scss";
import cx from "classnames";

export namespace HighlightsCollectionSlider {
    export type Props = ScrollSection.Props & {
        cityInit?: CitiesEntity;
        eventsInit: EventEntity[];
    };
}

export const HighlightsCollectionSlider = ({
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

    if(isFetching) {
        return "Fetching...";
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
};
