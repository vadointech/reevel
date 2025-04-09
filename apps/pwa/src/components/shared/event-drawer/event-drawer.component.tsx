"use client"

import { ComponentProps } from "react";

import cx from "classnames";
import styles from "./styles.module.scss";

import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "@/components/shared/drawer";
import Image from "next/image";
import { Container, Input } from "@/components/ui";
import { useDrawer } from "../drawer/drawer.component";

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

const DrawerContentComponent = () => {
    const { activeSnapPoint } = useDrawer();
    console.log('Current snap point:', activeSnapPoint);

    return (
        <DrawerContent className={styles.drawer}>
            <div className={styles.wrapper}>
                <div className={styles.image}>
                    <Image alt="test" src={defaultPosters[0]} fill />
                </div>
                <Container className={styles.header}>
                </Container>
                <div className={cx(
                    styles.test,
                    styles[`test_${activeSnapPoint}`]
                )}>

                </div>
            </div>
            <Container>
                <Input />
            </Container>
        </DrawerContent>
    );
};

export const EventDrawer = ({ }: EventDrawer.Props) => {
    return (
        <Drawer
            open={true}
            defaultPoint={"full"}
        >
            <DrawerBody>
                <DrawerContentComponent />
            </DrawerBody>
        </Drawer>
    );
};
