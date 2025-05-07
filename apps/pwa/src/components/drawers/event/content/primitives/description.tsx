import { motion, useAnimation } from "motion/react";
import { useTruncatedText } from "../../hooks/use-truncate-text.hook";
import { Typography } from "@/components/ui";

import styles from "../styles.module.scss";

export namespace EventDrawerContentDescription {
    export type Props = {
        children: string;
    };
}

export const EventDrawerContentDescription = ({ children }: EventDrawerContentDescription.Props) => {
    const animate = useAnimation();

    const [ref] = useTruncatedText(animate, {
        textHeight: 61,
    });

    return (
        <Typography.div size={"sm"}>
            <motion.p
                ref={ref}
                className={styles.hero__description}
                animate={animate}
                initial={{ height: 61, overflowY: "hidden" }}
            >
                { children }
            </motion.p>
        </Typography.div>
    );
};