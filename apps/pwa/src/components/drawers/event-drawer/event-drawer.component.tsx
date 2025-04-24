// @ts-nocheck
"use client"

import { ComponentProps, useRef, useState } from "react";
import clsx from "classnames";
import cx from "classnames";

import styles from "./styles.module.scss";

import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import Image from "next/image";
import { Button, Container, Input } from "@/components/ui";
import { useDrawer } from "../../shared/drawer/drawer.component";
import { HostedBy } from "../../shared/hosted-by";
import { TabButton } from "@/components/ui/tab-button";
import { IconClose, IconFire, IconMore, IconPlus, IconShare, TicketIcon } from "@/components/icons";
import { EventCard } from "../../shared/event-card";
import { Badge } from "@/components/ui/badge/badge.component";
import ReadMore from "../../shared/read-more/read-more.component";
import { EventButton } from "../../shared/event-button";
import { AttendersSection } from "../../shared/attenders";
import { EventDate } from "@/components/ui/date";

import { AnimatePresence, motion } from "framer-motion"
import { InterestCard } from "../../shared/interest-card";

import image_1 from "@/../public/assets/temp/carousel2.jpg";
import { Section } from "../../shared/section";
import { CollectionCard } from "../../shared/collection-card";
import { useScrollDirection } from "@/hooks";
import { EventDrawerInfo } from "./modules/event-info";
import { Event } from "@/entities/event";

import { IconWorld } from "@/components/icons/world";


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
        data: Event
    };
}


const DrawerContentComponent = ({ data }: EventDrawer.Props) => {
    const { activeSnapPoint } = useDrawer();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (activeSnapPoint === 'full') {
            setIsScrolled(e.currentTarget.scrollTop > 100);
        }
    };


    return (
        <DrawerContent className={styles.drawer}>
            <div className={styles.drawer__container}>
                <div className={styles.image}>
                    <Image alt="test" src={data.poster} fill />
                </div>
                <AnimatePresence>
                    {!isScrolled &&
                        <motion.div>
                            <Container className={styles.drawer__header}>
                                <div className={cx(
                                    styles.drawer__header__info,
                                    styles[`drawer__header__info_${activeSnapPoint}`]
                                )}>

                                    {activeSnapPoint === "low" ? (
                                        <div />
                                    ) : <HostedBy avatar={data.hosts.picture} author={data.hosts.fullName} />
                                    }

                                    <TabButton variant="icon" icon={<IconClose width={8} height={8} />} />

                                </div>
                                <Badge
                                    title={data.visibility}
                                    icon={<IconWorld />}
                                    variant="ghost"
                                    className={clsx({
                                        [styles.drawer__translate_hide]: ["low", "middle"].includes(activeSnapPoint),
                                    })}
                                />
                            </Container>
                        </motion.div>
                    }
                </AnimatePresence>

                <EventDrawerInfo data={data} handleScroll={handleScroll} isScrolled={isScrolled} />

            </div >

        </DrawerContent >
    );
};

export const EventDrawer = ({ data }: EventDrawer.Props) => {
    return (
        <Drawer
            modal={false}
            overlay={false}
            open={true}
            defaultPoint={"full"}
            data={data}
        >
            <DrawerBody>
                <DrawerContentComponent data={data} />
            </DrawerBody>
        </Drawer>
    );
};
