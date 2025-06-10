import { ChangeEvent, useCallback, useState } from "react";
import { Header } from "@/components/shared/_redesign";

import styles from "../styles.module.scss";
import cx from "classnames";

export namespace SearchScreenSearchBar {
    export type Props = Omit<Header.SearchProps, "onChange"> & {
        onChange?: (value: string) => void;
    };
}

export const SearchScreenSearchBar = ({
    onChange,
    className,
    ...props
}: SearchScreenSearchBar.Props) => {
    const [value, setValue] = useState("");

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue(value);
        onChange?.(value);
    }, [onChange]);

    return (
        <Header.Search
            value={value}
            className={cx(styles.search__header, className)}
            onChange={handleChange}
            {...props}
        />
    );
};
