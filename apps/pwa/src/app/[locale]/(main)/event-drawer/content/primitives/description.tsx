import { motion, useAnimation } from "motion/react";
import { useTruncatedText } from "../../hooks/use-truncate-text.hook";
import styles from "./../styles.module.scss";

export namespace EventDrawerContentDescription {
    export type Props = {
        children: string;
    };
}

export const EventDrawerContentDescription = ({ children }: EventDrawerContentDescription.Props) => {
    const animate = useAnimation();

    const [ref, handleToggle] = useTruncatedText(animate, {
        text: children,
        textHeight: 61,
        closeSuffix: ["...", " <span>More</span>"],
    });

    return (
        <motion.p
            ref={ref}
            className={styles.hero__description}
            animate={animate}
            initial={{ height: 61, overflowY: "hidden" }}
            onClick={handleToggle}
        >
            { children }
        </motion.p>
    );
};