import { Link } from "@/i18n/routing";
import { IconArrowRight } from "@/components/icons";
import { HTMLMotionProps, motion } from "motion/react";

import { OptionsListItemLeft, OptionsListItemContent, OptionsListItemRight } from "./primitives";
import { listItem, OptionsListItem } from "@/components/ui";

export namespace MotionOptionsListItem {
    export type Props =  OptionsListItem.Props & Omit<HTMLMotionProps<"li">, "children">;
}

export const MotionOptionsListItem = ({
    weight,
    variant,
    index = 1,
    size,
    contentLeft,
    contentRight = <IconArrowRight />,
    contentBottom,
    label,
    status,
    description,
    iconType = "filled",
    href,
    relativeTime,
    className,
    ...props
}: MotionOptionsListItem.Props) => {
    const liContent = (
        <motion.li
            layout
            initial={{
                opacity: 0,
                scale: 0.95,
                y: -10,
                filter: "blur(6px)",
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                    delay: index * 0.03,
                },
            }}
            exit={{
                opacity: 0,
                scale: 0.95,
                y: -10,
                filter: "blur(6px)",
            }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                layout: { type: "spring", stiffness: 500, damping: 40 },
            }}
            className={listItem({ weight, variant, size, className })}
            {...props}
        >
            <OptionsListItemLeft
                contentLeft={contentLeft}
                iconType={iconType}
            />
            <OptionsListItemContent
                label={label}
                description={description}
                status={status}
                relativeTime={relativeTime}
                contentBottom={contentBottom}
            />
            <OptionsListItemRight
                contentRight={contentRight}
            />
        </motion.li>
    );

    if (href) {
        return <Link
            href={href}
        >
            { liContent }
        </Link>;
    }
    return liContent;
};