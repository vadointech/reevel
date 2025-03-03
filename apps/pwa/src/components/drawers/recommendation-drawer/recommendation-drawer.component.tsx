import { ComponentProps } from "react";
import cx from "classnames";
import styles from "./styles.module.scss";
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import { Avatar, Input } from "@/components/ui";
import { Section } from "@/components/shared/section";
import { Search } from "@/components/icons/search";
import { EventDate } from "@/components/ui/date";
import { RecentCard } from "@/components/shared/recent-card/recent-card.component";
import { CollectionCard } from "@/components/shared/collection-card";

export namespace RecommendationDrawer {
    export type Props = ComponentProps<"div"> & {

    };
}

export const RecommendationDrawer = ({ }: RecommendationDrawer.Props) => {
    return (
        <Drawer>
            <DrawerTrigger>
                Drawer here
            </DrawerTrigger>
            <DrawerBody>
                <div>

                </div>
                <DrawerContent>
                    <div className={styles.drawer__content}>
                        <div className={styles.drawer__content__input}>
                            <Input inputSize="default" variant="rounded" placeholder="Search events" icon={<Search />} />
                            <Avatar size={40} variant="profile" />
                        </div>

                        <Section title="Recent" size="small" type="All" cols className={styles.drawer__content__sections}>
                            <RecentCard title="Outdoor Movie Night" img={''} />
                            <RecentCard title="Outdoor Movie Night" img={''} />
                            <RecentCard title="Outdoor Movie Night" img={''} />
                            <RecentCard title="Outdoor Movie Night" img={''} />
                            <RecentCard title="Outdoor Movie Night" img={''} />
                            <RecentCard title="Outdoor Movie Night" img={''} />
                            <RecentCard title="Outdoor Movie Night" img={''} />
                            <RecentCard title="Outdoor Movie Night" img={''} />
                            <RecentCard title="Outdoor Movie Night" img={''} />
                            <RecentCard title="Outdoor Movie Night" img={''} />
                            <RecentCard title="Outdoor Movie Night" img={''} />
                        </Section>

                        <Section title="Discover" size="small" type="All" className={styles.drawer__content__sections}>
                            <CollectionCard
                                title="Games"
                                city="Vinn"
                                emoji="🚜"
                                backgroundText="Games"
                                colorFrom="#7D9A5D"
                                colorTo="#4F6F3A"
                            />
                            <CollectionCard
                                title="Games"
                                city="Vinn"
                                emoji="🚜"
                                backgroundText="Games"
                                colorFrom="#7D9A5D"
                                colorTo="#4F6F3A"
                            />
                            <CollectionCard
                                title="Games"
                                city="Vinn"
                                emoji="🚜"
                                backgroundText="Games"
                                colorFrom="#7D9A5D"
                                colorTo="#4F6F3A"
                            />
                        </Section>
                    </div>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    );
};
