import { ComponentProps } from "react";
import styles from "./styles.module.scss";

import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";

import { Avatar, Input } from "@/components/ui";
import { Section } from "@/components/shared/section";
import { Search } from "@/components/icons/search";
import { RecentCard } from "@/components/shared/recent-card/recent-card.component";
import { CollectionCard } from "@/components/shared/collection-card";
import { EventCard } from "@/components/shared/event-card";

import image_1 from "@/../public/assets/temp/carousel2.jpg";

export namespace RecommendationDrawer {
    export type Props = ComponentProps<"div"> & {
        open?: boolean;
    };
}

export const RecommendationDrawer = ({ open }: RecommendationDrawer.Props) => {
    return (
        <Drawer open={open}>
            <DrawerBody>
                <DrawerContent>
                    <div className={styles.drawer}>
                        <div className={styles.drawer__content}>
                            <div className={styles.drawer__content__input}>
                                <Input variant="rounded" placeholder="Search events" icon={<Search />} />
                                <Avatar size={40} variant="profile" type="custom" />
                            </div>

                            <div className={styles.drawer__content__scroll}>
                                <Section title="Recent" size="small" cols className={styles.drawer__content__sections}>
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

                                <Section title="Discover" size="small"  className={styles.drawer__content__sections}>
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

                                <Section title="Popular in Vinnytsia" size="small" className={styles.drawer__content__sections}>
                                    <EventCard
                                        title="NYC Outdoor Movie Night"
                                        descr="Contrary to popular belief, Lorem Ipsum is not simply..."
                                        badge=""
                                        src={image_1}
                                    />
                                    <EventCard
                                        title="NYC Outdoor Movie Night"
                                        descr="Contrary to popular belief, Lorem Ipsum is not simply..."
                                        src={image_1}
                                        badge=""

                                    />
                                    <EventCard
                                        title="NYC Outdoor Movie Night"
                                        descr="Contrary to popular belief, Lorem Ipsum is not simply..."
                                        src={image_1}
                                        badge=""

                                    />
                                </Section>
                            </div>
                        </div>
                    </div>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    );
};
