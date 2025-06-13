import { Button } from "@/components/ui";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace SearchScreenLoadMoreButton {
    export type Props = Button.Props;
}

export const SearchScreenLoadMoreButton = ({
    className,
    ...props
}: SearchScreenLoadMoreButton.Props) => {
    return (
        <Button
            size={"small"}
            variant={"text-primary"}
            className={cx(styles.search__more, className)}
            {...props}
        >
            Load more
        </Button>
    );
};
