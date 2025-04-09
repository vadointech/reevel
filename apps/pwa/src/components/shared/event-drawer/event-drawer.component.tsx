"use client"

import { ComponentProps, useState } from "react";

import cx from "classnames";
import styles from "./styles.module.scss";

import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import Image from "next/image";
import { Container, Input } from "@/components/ui";

const defaultPosters = [
    "http://localhost:3000/assets/temp/valentine.png",
    "http://localhost:3000/assets/temp/poster1.jpg",
    "http://localhost:3000/assets/temp/poster2.png",
    "http://localhost:3000/assets/temp/poster3.png",
    "http://localhost:3000/assets/temp/poster4.png",
];

export namespace EventDrawer {
    export type Props = ComponentProps<"div"> & {};
}

export const EventDrawer = ({ }: EventDrawer.Props) => {
    const [activeSnapPoint, setActiveSnapPoint] = useState<string | number | null>(null);

    const handleSnapPointChange = (snapPoint: string | number | null) => {
        console.log('Current snap point:', snapPoint);
    };

    return (
        <Drawer
            open={true}
            defaultPoint={"full"}
            // activeSnapPoint={activeSnapPoint}
            setActiveSnapPoint={handleSnapPointChange}
        >
            <DrawerBody>
                <DrawerContent className={styles.drawer}>
                    <div className={styles.wrapper}>
                        <div className={styles.image}>
                            <Image alt="test" src={defaultPosters[0]} fill />
                        </div>
                        <div className={styles.test}>

                        </div>
                    </div>
                    <Container>
                        <Input />
                    </Container>
                </DrawerContent>
            </DrawerBody>
        </Drawer>
    );
};
