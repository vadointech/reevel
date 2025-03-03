import { ComponentProps } from "react";
import styles from "./styles.module.scss";

import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";

import { Avatar, Input } from "@/components/ui";
import { Section } from "@/components/shared/section";
import { Search } from "@/components/icons/search";
import { RecentCard } from "@/components/shared/recent-card/recent-card.component";
import { EventCard } from "@/components/shared/event-card";

import image_1 from "@/../public/assets/temp/carousel2.jpg";

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
                    <div className={styles.drawer}>
                        <div className={styles.drawer__content}>
                            <div className={styles.drawer__content__input}>
                                <Input inputSize="default" variant="rounded" placeholder="Search events" icon={<Search />} />
                                <Avatar size={40} variant="profile" type="custom" />
                            </div>

                            <div className={styles.drawer__content__scroll}>
                                <Section title="Recent" size="small" type="All" className={styles.drawer__content__sections}>
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

                                </Section>

                                <Section title="Popular in Vinnytsia" size="small" type="All" className={styles.drawer__content__sections}>
                                    <EventCard
                                        date={'17 Sep'}
                                        title="NYC Outdoor Movie Night"
                                        descr="Contrary to popular belief, Lorem Ipsum is not simply..."
                                        author="Jimmy Smith"
                                        src={image_1}
                                    />
                                    <EventCard
                                        date={'17 Sep'}
                                        title="NYC Outdoor Movie Night"
                                        descr="Contrary to popular belief, Lorem Ipsum is not simply..."
                                        author="Jimmy Smith"
                                        src={image_1}
                                    />
                                    <EventCard
                                        date={'17 Sep'}
                                        title="NYC Outdoor Movie Night"
                                        descr="Contrary to popular belief, Lorem Ipsum is not simply..."
                                        author="Jimmy Smith"
                                        src={image_1}
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
