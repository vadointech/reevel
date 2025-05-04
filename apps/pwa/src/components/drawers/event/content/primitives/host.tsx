import { ComponentProps } from "react";
import { motion, useTransform } from "motion/react";

import { hexToRgba } from "@/utils/hex-to-rgba";
import { useDrawerContentDragYProgress, useDrawerDragYProgress } from "../../config/motion-values";
import { HERO_SECTION_OFFSET } from "@/components/drawers/event/config/snap-points";

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
    const drawerContentDragYProgress = useDrawerContentDragYProgress();

    const hostOpacity = useTransform<number, number>(
        [drawerDragYProgress, drawerContentDragYProgress],
        ([drawerY, contentY]) => {
            if(contentY > 0) {
                if (contentY <= HERO_SECTION_OFFSET - 100) return 1;
                if (contentY >= HERO_SECTION_OFFSET) return 0;
                return (HERO_SECTION_OFFSET - contentY) / 100;
            }
            if (drawerY >= 0.4) return 1;
            if (drawerY <= 0.1) return 0;

            return (drawerY - 0.1) / (0.4 - 0.1);
        },
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
