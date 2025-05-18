import { ComponentProps } from "react";

import styles from "./styles.module.scss";

export namespace LocationPickerListView {
    export type Props = ComponentProps<"div">;
}

export const LocationPickerListView = ({ ...props }: LocationPickerListView.Props) => {
    return (
        <div {...props}>

        </div>
    );
};
