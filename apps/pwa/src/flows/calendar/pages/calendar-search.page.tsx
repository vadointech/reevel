import { SearchScreen, SearchScreenContent, SearchScreenSearchBar } from "@/components/screens/search";
import { getUserMapInternalConfig } from "@/components/shared/map/utils";
import { MapRootProvider } from "@/components/shared/map/map.provider";
import { GetCityHighlightsQueryBuilder } from "@/features/discover/queries";
import { seedEventUsers } from "@/features/event/utils";
import { Section } from "@/components/sections";
import { EventListItemCard, OptionsList } from "@/components/ui";
import { Link } from "@/i18n/routing";
import { DiscoverStaticCollections } from "@/features/discover/config";

import styles from "../styles/calendar-search-page.module.scss";

export namespace CalendarSearchPage {
    export type Props = never;
}

export async function CalendarSearchPage() {
    const mapConfig = await getUserMapInternalConfig();
    const mapProvider = new MapRootProvider(mapConfig);

    const { bounds, center } = mapProvider.internalConfig.viewState;
    const radius = mapProvider.getHorizontalRadius(bounds, center);

    let events = await GetCityHighlightsQueryBuilder.queryFunc({
        center,
        radius,
    });
    events = seedEventUsers(events);

    return (
        <div className={styles.page}>
            <SearchScreen>
                <SearchScreenSearchBar
                    controlHref={"/calendar"}
                />
                <SearchScreenContent>
                    <Section title={"Upcoming"}>
                        <OptionsList>
                            {
                                events.slice(0, 3).map(event => (
                                    <Link
                                        key={event.id}
                                        href={DiscoverStaticCollections.Root + "/event/" + event.id}
                                    >
                                        <EventListItemCard event={event} />
                                    </Link>
                                ))
                            }
                        </OptionsList>
                    </Section>

                    <Section title={"Hosting"}>
                        <OptionsList>
                            {
                                events.slice(0, 2).map(event => (
                                    <Link
                                        key={event.id}
                                        href={DiscoverStaticCollections.Root + "/event/" + event.id}
                                    >
                                        <EventListItemCard event={event} />
                                    </Link>
                                ))
                            }
                        </OptionsList>
                    </Section>
                </SearchScreenContent>
            </SearchScreen>
        </div>
    );
}
