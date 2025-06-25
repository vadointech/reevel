import { ComponentProps } from "react";
import { motion, useTransform } from "motion/react";

import { hexToRgba } from "@/utils/hex-to-rgba";

import { HostedBy } from "@/components/ui/hosted-by";

import styles from "../styles.module.scss";
import { UserProfileEntity } from "@/entities/profile";
import { useEventDrawerContext } from "@/components/drawers/event/event-drawer.context";

export namespace EventDrawerContentHost {
    export type Props = ComponentProps<"div"> & {
        host?: UserProfileEntity,
        primaryColor: string;
    };
}

export const EventDrawerContentHost = ({
    host,
    primaryColor,
}: EventDrawerContentHost.Props) => {
    const {
        config,
        drawerDragYProgress,
        drawerContentDragYProgress,
    } = useEventDrawerContext();

    const hostOpacity = useTransform<number, number>(
        [drawerDragYProgress, drawerContentDragYProgress],
        ([drawerY, contentY]) => {
            if(contentY > 0) {
                if (contentY <= config.heroSectionOffset - 100) return 1;
                if (contentY >= config.heroSectionOffset) return 0;
                return (config.heroSectionOffset - contentY) / 100;
            }
            if (drawerY >= 0.4) return 1;
            if (drawerY <= 0.1) return 0;

            return (drawerY - 0.1) / (0.4 - 0.1);
        },
    );

    return (
        <motion.div
            className={styles.header__host}
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
            <HostedBy avatar={host?.picture}>
                { host?.fullName }
            </HostedBy>
        </motion.div>
    );
};
