"use client"

import { Container } from "@/components/ui";
import { useDrawer } from "../../../shared/drawer/drawer.component";
import styles from "../styles.module.scss"

import cx from "classnames"
import { AnimatePresence, motion } from "framer-motion";
import { IconFire, TicketIcon, IconShare, IconMore, IconWarn } from "@/components/icons";
import { Badge } from "@/components/ui/badge/badge.component";
import { EventDate } from "@/components/ui/date";
import { TabButton } from "@/components/ui/tab-button";
import { CollectionCard } from "../../../shared/collection-card";
import { EventButton } from "../../../shared/event-button";
import { EventCard } from "../../../shared/event-card";
import ReadMore from "../../../shared/read-more/read-more.component";
import { Section } from "../../../shared/section";

import { format } from "date-fns";

import image_1 from "@/../public/assets/temp/carousel2.jpg";
import { AttendersSection } from "../../../shared/attenders";

import { Event } from "@/entities/event";
import { Place } from "@/components/ui/place";
import { RatingCard } from "@/components/shared/rating-card";
import { Stars } from "@/components/shared/stars";
import { OptionItem, Options } from "@/components/shared/options";
import { useState } from "react";
import { ReportDrawer } from "../../report-drawer";

const defaultPosters = [
    { id: 1, picture: "http://localhost:3000/assets/temp/valentine.png" },
    { id: 2, picture: "http://localhost:3000/assets/temp/poster1.jpg" },
    { id: 3, picture: "http://localhost:3000/assets/temp/poster2.png" },
    { id: 4, picture: "http://localhost:3000/assets/temp/poster3.png" },
    { id: 5, picture: "http://localhost:3000/assets/temp/poster4.png" },
];


export namespace EventDrawerInfo {
    export type Props = {
        isScrolled: boolean;
        handleScroll: () => void;
        data: Event;
    }
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Я б оце всьо що в середині порозбивав на менші компоненти, якщо скажеш да, то так і зроблю. 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


export const EventDrawerInfo = ({
    isScrolled,
    handleScroll,
    data,
}: EventDrawerInfo.Props) => {


    const { activeSnapPoint } = useDrawer();
    const [open, setOpen] = useState(false)

    return (
        <div
            className={cx(
                styles.wrapper,
                activeSnapPoint === "full" ? styles[`wrapper_show`] : styles[`wrapper_none`],
            )}

            onScroll={handleScroll}
        >

            <div className={styles.helper} />

            <Container className={cx(
                styles.drawer__info__title,
                styles[`drawer__info__title_${activeSnapPoint}`],
                isScrolled && styles.drawer__info__title_scrolled,
            )}>
                <AnimatePresence>
                    <motion.div
                        animate={{
                            height: "fit-content",
                            opacity: 1,
                            bottom: "0px",
                            top: activeSnapPoint === "middle" ? "-55px" : activeSnapPoint === "low" ? "-200px" : "auto",
                            position: "relative",
                        }}

                        transition={{
                            duration: 0.6,
                            ease: "easeInOut"
                        }}
                    >
                        <Badge
                            className={cx(
                                styles.drawer__info__tickets,
                                styles[`drawer__info__tickets_${activeSnapPoint}`],
                                (isScrolled || activeSnapPoint === "low") && styles.drawer__translate_hide
                            )}
                            icon={<IconFire />}
                            variant="fire"
                            title={`${data.tickets.length.toString()} tickets left`}
                        />

                        <h1>{data.title}</h1>

                    </motion.div>
                </AnimatePresence>

            </Container >

            <AnimatePresence>
                <motion.div
                    initial={{
                        height: "100%",
                        opacity: 0.3,
                        bottom: "0px",
                        position: "relative",
                    }}
                    animate={{
                        height: "fit-content",
                        opacity: 1,
                        bottom: "0px",
                        top: activeSnapPoint === "middle" ? "-55px" : activeSnapPoint === "low" ? "20px" : "auto",
                        position: "relative",
                        y: 0
                    }}
                    exit={{
                        height: "100%",
                        opacity: 0,
                        position: "relative",
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut"
                    }}
                >
                    <Container
                        className={cx(
                            styles.drawer__info,
                            styles[`drawer__info_${activeSnapPoint}`],
                            activeSnapPoint === 'full' && styles.drawer__info_full,
                        )}
                    >

                        <div
                            className={cx(
                                styles.drawer__info__date,
                                activeSnapPoint == "low" && styles.drawer__translate_hide
                            )}>

                            <Place place={data.location?.properties.name ?? ""} />
                            <EventDate date={format(data.dateTime, "EEEE, MMM d • HH:mm")}
                            />
                        </div>


                        <div className={cx(
                            styles.drawer__info__price,
                            activeSnapPoint == "low" && styles.drawer__translate_hide
                        )}>
                            <h2>{`$ ${data.ticketPrice}`}</h2>
                            {/* SOLVE IT LATER!!!!!!!!!!!!!!!!!!!!! */}
                            {/* @ts-ignore */}
                            <AttendersSection users={defaultPosters} />
                        </div>
                        <div className={cx(
                            styles.drawer__info__buttons,
                            activeSnapPoint == "low" && styles.drawer__translate_hide
                        )}>
                            <EventButton
                                className={styles.icon__ticket}
                                fill
                                icon={<TicketIcon width={18} />}
                            >
                                Join
                            </EventButton>
                            <EventButton
                                className={styles.icon__share}
                                icon={<IconShare />}
                            >
                                Share
                            </EventButton>
                            <EventButton className={styles.icon__more} icon={<IconMore />}>
                                More
                            </EventButton>

                        </div>

                        <ReadMore
                            className={cx(
                                styles.drawer__info__description,
                                activeSnapPoint == "low" && styles.drawer__translate_hide
                            )}
                            description={data.description}
                            maxChars={149}
                        />
                    </Container>
                </motion.div>
            </AnimatePresence>

            <Container className={styles.drawer__recommendations}>
                <div className={styles.drawer__recommendations__interests}>
                    {data.interests.map((item) => (
                        <TabButton name={item.title_uk} icon={item.icon} />
                    ))}

                </div>

                <div className={styles.drawer__recommendations__separator} />

                <Section title="Similar interests" size="default" className={styles.drawer__recommendations__similar}>
                    <CollectionCard
                        title="Volleyball"
                        city="Vinnitsa"
                        emoji="🔭"
                        backgroundText="Vinnitsa"
                        colorFrom="#0A192F"
                        colorTo="#23395D"
                    />
                    <CollectionCard
                        title="Volleyball"
                        city="Vinnitsa"
                        emoji="🔭"
                        backgroundText="Vinnitsa"
                        colorFrom="#A54F4F"
                        colorTo="#6A3232"
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

                <Section title="Popular in Vinnytsia" size="default" className={styles.drawer__recommendations__popular}>
                    <EventCard
                        place="ТЦ SkyPark"
                        title="NYC Outdoor Movie Night"
                        badge="14 feb"
                        size="small"
                        src={"http://localhost:3000/assets/temp/valentine.png"}
                        gradientColor="#AB002F"

                    />
                    <EventCard
                        place="ТЦ SkyPark"
                        title="NYC Outdoor Movie Night"
                        src={"http://localhost:3000/assets/temp/valentine.png"}
                        badge="14 feb"
                        size="small"
                        gradientColor="#AB002F"
                    />
                    <EventCard
                        size="small"
                        place="ТЦ SkyPark"
                        badge="19"
                        title="NYC Outdoor Movie Night"
                        src={"http://localhost:3000/assets/temp/valentine.png"}
                        gradientColor="#AB002F"
                    />
                </Section>

                <Section title="Rating & reviews" type="See all" size="default" className={styles.drawer__recommendations__rating}>
                    <div className={styles.drawer__recommendations__rating__total}>
                        <Stars defaultRating="4" count={5} iconSize={26} readonly />
                        <div className={styles.drawer__recommendations__rating__total__reviews}>
                            <div>4,1</div>
                            <span>(588)</span>
                        </div>
                    </div>

                    <RatingCard />
                </Section>

                <div>
                    <Options >
                        <OptionItem icon={<IconWarn />} label="Report" warn onClick={() => setOpen(true)} />
                    </Options>
                </div>

                <ReportDrawer open={open} />

            </Container>
        </div>
    )
}