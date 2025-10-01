import { IconBell, IconMap } from "@/components/icons";

import { Avatar, EventCard, OptionsList } from "@/components/ui";
import { Link } from "@/i18n/routing";

import { ScrollSection } from "@/components/sections";
import { DiscoverStaticCollections } from "@/features/discover/config";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetCityHighlightsQueryBuilder } from "@/features/discover/queries";
import { TabsBody, TabsRoot } from "@/components/shared/tabs";
import { EventListItemCard } from "@/components/ui";
import { seedEventUsers } from "@/features/event/utils";

import styles from "../styles/calendar-page.module.scss";

export namespace CalendarPage {
    export type Props = never;
}

export async function CalendarPage() {
    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    let cityHighlights = await GetCityHighlightsQueryBuilder.queryFunc({
        center,
        radius,
    });

    cityHighlights = seedEventUsers(cityHighlights);

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <Link
                    href={"/profile"}
                    className={styles.header__avatar}
                >
                    <Avatar image={"/assets/temp/avatar.png"} />
                </Link>
                <h2 className={styles.header__title}>
                    Today, 7 Sep
                </h2>
                <div className={styles.header__controls}>
                    <Link href={"/calendar/map"}>
                        <IconMap />
                    </Link>
                    <Link href={"/activity"}>
                        <IconBell />
                        <span className={styles.header__badge}>
                            2
                        </span>
                    </Link>
                </div>
            </header>
            <div className={styles.page__gap}>
                <ScrollSection
                    title={"Events for today"}
                >
                    {
                        cityHighlights.map(event => (
                            <Link
                                key={event.id}
                                href={DiscoverStaticCollections.Root + "/event/" + event.id}
                            >
                                <EventCard event={event} />
                            </Link>
                        ))
                    }
                </ScrollSection>
                <div>
                    <TabsRoot fitContent>
                        <TabsBody
                            content={[
                                {
                                    label: "Upcoming • 3",
                                    value: (
                                        <OptionsList>
                                            {
                                                cityHighlights.slice(0, 3).map(event => (
                                                    <Link
                                                        key={event.id}
                                                        href={DiscoverStaticCollections.Root + "/event/" + event.id}
                                                    >
                                                        <EventListItemCard event={event} />
                                                    </Link>
                                                ))
                                            }
                                        </OptionsList>
                                    ),
                                },
                                {
                                    label: "Hosting • 2",
                                    value: (
                                        <OptionsList>
                                            {
                                                cityHighlights.slice(0, 2).map(event => (
                                                    <Link
                                                        key={event.id}
                                                        href={DiscoverStaticCollections.Root + "/event/" + event.id}
                                                    >
                                                        <EventListItemCard event={event} />
                                                    </Link>
                                                ))
                                            }
                                        </OptionsList>
                                    ),
                                },
                                {
                                    label: "Attending • 9",
                                    value: (
                                        <OptionsList>
                                            {
                                                cityHighlights.slice(0, 9).map(event => (
                                                    <Link
                                                        key={event.id}
                                                        href={DiscoverStaticCollections.Root + "/event/" + event.id}
                                                    >
                                                        <EventListItemCard event={event} />
                                                    </Link>
                                                ))
                                            }
                                        </OptionsList>
                                    ),
                                },
                            ]}
                        />
                    </TabsRoot>
                </div>
            </div>
        </div>
    );
}
