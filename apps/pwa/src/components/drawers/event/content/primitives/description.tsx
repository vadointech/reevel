import { useTruncatedText } from "../../hooks/use-truncate-text.hook";
import { Typography } from "@/components/ui";

import styles from "../styles.module.scss";

export namespace EventDrawerContentDescription {
    export type Props = {
        children: string;
    };
}

export const EventDrawerContentDescription = ({ children }: EventDrawerContentDescription.Props) => {
    const [ref, handleToggle] = useTruncatedText({
        textHeight: 61,
    });

    return (
        <Typography.div size={"sm"}>
            <p
                ref={ref}
                className={styles.hero__description}
                style={{ maxHeight: 61 }}
                onClick={handleToggle}
            >
                { children }
            </p>
        </Typography.div>
    );
};