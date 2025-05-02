import { ComponentProps } from "react";
import { motion, useTransform } from "motion/react";

import { useDrawerDragYProgress } from "../../root";
import { hexToRgba } from "@/utils/hex-to-rgba";

import { HostedBy } from "@/components/shared/hosted-by";

import styles from "../styles.module.scss";

export namespace EventDrawerContentHost {
    export type Props = ComponentProps<"div"> & {
        host: {
            name: string;
            avatar: string;
        },
        primaryColor: string;
    };
}

export const EventDrawerContentHost = ({
    primaryColor,
}: EventDrawerContentHost.Props) => {
    const drawerDragYProgress = useDrawerDragYProgress();

    const hostOpacity = useTransform(
        drawerDragYProgress,
        [
            1,
            .5,
            .4,
            .1,
        ],
        [
            1,
            1,
            1,
            0,
        ],
    );

    return (
        <motion.div
            className={styles.content__host}
            style={{
                opacity: hostOpacity,
                background: `linear-gradient(
                    to bottom,
                    ${hexToRgba(primaryColor, 0.6)} 52%,
                    ${hexToRgba(primaryColor, 0.5)} 66%,
                    ${hexToRgba(primaryColor, 0.3)} 80%,
                    ${hexToRgba(primaryColor, 0.1)} 92%,
                    ${hexToRgba(primaryColor, 0)} 100%
                )`,
            }}
        >
            <HostedBy
                avatar={"/assets/temp/avatar.png"}
                name={"Jimmy Smith"}
            />
        </motion.div>
    );
};
