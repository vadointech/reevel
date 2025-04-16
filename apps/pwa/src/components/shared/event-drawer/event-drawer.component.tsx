// @ts-nocheck
"use client"

import { ComponentProps, useState } from "react";

import cx from "classnames";
import styles from "./styles.module.scss";

import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import Image from "next/image";
import { Button, Container, Input } from "@/components/ui";
import { useDrawer } from "../drawer/drawer.component";
import { HostedBy } from "../hosted-by";
import { TabButton } from "@/components/ui/tab-button";
import { IconClose, IconFire, IconMore, IconPlus, IconShare, TicketIcon } from "@/components/icons";
import { EventCard } from "../event-card";
import { Badge } from "@/components/ui/badge/badge.component";
import ReadMore from "../read-more/read-more.component";
import { EventButton } from "../event-button";
import { AttendersSection } from "../attenders";
import { EventDate } from "@/components/ui/date";

import { AnimatePresence, motion } from "framer-motion"

const defaultPosters = [
    { id: 1, picture: "http://localhost:3000/assets/temp/valentine.png" },
    { id: 2, picture: "http://localhost:3000/assets/temp/poster1.jpg" },
    { id: 3, picture: "http://localhost:3000/assets/temp/poster2.png" },
    { id: 4, picture: "http://localhost:3000/assets/temp/poster3.png" },
    { id: 5, picture: "http://localhost:3000/assets/temp/poster4.png" },
];

export namespace EventDrawer {
    export type Props = ComponentProps<"div"> & {
        open: boolean;
    };
}


const DrawerContentComponent = () => {
    const { activeSnapPoint } = useDrawer();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (activeSnapPoint === 'full') {
            setIsScrolled(e.currentTarget.scrollTop > 30);
        }
    };

    return (
        <DrawerContent className={styles.drawer}>
            <div className={styles.drawer__wrapper}>
                <div className={styles.image}>
                    <Image alt="test" src={defaultPosters[0].picture} fill />
                </div>
                <Container className={styles.drawer__header}>
                    <div className={cx(
                        styles.drawer__header__info,
                        styles[`drawer__header__info_${activeSnapPoint}`]
                    )}>


                        {activeSnapPoint === "low" ? (
                            <div></div>
                        ) : <HostedBy author="Vlad Savenko" />
                        }
                        <TabButton variant="icon" icon={<IconClose width={8} height={8} />} />
                    </div>
                    <Badge className={activeSnapPoint === "low" || activeSnapPoint === "middle" ? styles.drawer__translate_hide : ""} title="Public" variant="ghost" />
                </Container>


                <AnimatePresence>
                    <motion.div
                        initial={{
                            height: "fit-content",
                            opacity: 0.3,
                            bottom: "0px",
                            position: "absolute",
                        }}
                        animate={{
                            height: "fit-content",
                            opacity: 1,
                            bottom: "0px",
                            top: activeSnapPoint === "middle" ? "170px" : activeSnapPoint === "low" ? "20px" : "auto",
                            position: "absolute",
                            y: 0
                        }}
                        exit={{
                            height: "fit-content",
                            opacity: 0,
                            position: "absolute",
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
                                isScrolled && styles.scrolled
                            )}
                            onScroll={handleScroll}
                        >
                            <Badge
                                className={cx(
                                    styles.drawer__info__tickets,
                                    styles[`drawer__info__tickets_${activeSnapPoint}`],
                                    activeSnapPoint == "low" && styles.drawer__translate_hide
                                )}
                                icon={<IconFire />}
                                variant="fire"
                                title="10 tickets left"
                            />
                            <h1 className={cx(
                                styles.drawer__info__title,
                                styles[`drawer__info__title_${activeSnapPoint}`],
                            )}>Happy Valentine's Day Party</h1>

                            <EventDate className={cx(
                                styles.drawer__info__date,
                                activeSnapPoint == "low" && styles.drawer__translate_hide
                            )} />

                            <div className={cx(
                                styles.drawer__info__price,
                                activeSnapPoint == "low" && styles.drawer__translate_hide
                            )}>
                                <h2>378 $</h2>
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
                                description="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 20"
                                maxChars={149}
                            />


                        </Container>
                    </motion.div>
                </AnimatePresence>
                {/* <div className={cx(
                    styles.background,
                    styles[`background_${activeSnapPoint}`],
                    isScrolled && styles.scrolled

                )}>
                </div> */}
            </div >
            <Container>
                <Input />
                <Input />

                <Input />


            </Container>
        </DrawerContent >
    );
};

export const EventDrawer = ({ }: EventDrawer.Props) => {
    return (
        <Drawer
            modal={false}
            overlay={false}
            open={true}
            defaultPoint={"full"}
        >
            <DrawerBody>
                <DrawerContentComponent />
            </DrawerBody>
        </Drawer>
    );
};
