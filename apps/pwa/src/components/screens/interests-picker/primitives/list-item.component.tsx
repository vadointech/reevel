import { motion } from "motion/react";
import { Checkbox, OptionsListItem } from "@/components/shared/_redesign";
import { InterestEntity } from "@/entities/interests";

const listItemVariants = {
    initial: { opacity: 0, y: -10, height: 0, marginBottom: 0, overflow: "hidden" },
    animate: {
        opacity: 1,
        y: 0,
        height: "auto",
        marginBottom: "2rem",
        transition: {
            duration: 0.2,
            ease: [0.215, 0.61, 0.355, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        height: 0,
        marginBottom: 0,
        overflow: "hidden",
        transition: {
            duration: 0.15,
            ease: [0.6, -0.28, 0.735, 0.045],
        },
    },
};

export namespace InterestsPickerScreenListItem {
    export type Data = {
        interest: InterestEntity;
    };
    export type Props = Data & {
        selected?: boolean;
        onClick?: () => void;
    };
}

export const InterestsPickerScreenListItem = ({
    selected,
    interest,
    onClick,
}: InterestsPickerScreenListItem.Props) => {
    return (
        <motion.div
            key={interest.slug}
            variants={listItemVariants}
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            custom={0}
            style={{ overflow: "hidden" }}
        >
            <OptionsListItem
                label={interest.title_en}
                contentLeft={interest.icon}
                contentRight={<Checkbox checked={selected} />}
                onClick={onClick}
            />
        </motion.div>
    );
};
