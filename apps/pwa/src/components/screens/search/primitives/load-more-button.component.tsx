import { Button } from "@/components/ui";

import styles from "../styles.module.scss";

export namespace SearchScreenLoadMoreButton {
    export type Props = Button.Props;
}

export const SearchScreenLoadMoreButton = (props: SearchScreenLoadMoreButton.Props) => {
    return (
        <div className={styles.search__more}>
            <Button
                size={"small"}
                variant={"text-primary"}
                {...props}
            >
                Load more
            </Button>
        </div>
    );
};
