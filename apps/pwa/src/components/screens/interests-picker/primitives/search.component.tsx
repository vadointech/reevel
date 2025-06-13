import { observer } from "mobx-react-lite";
import { useInterestsPickerContext } from "@/features/interests/picker";

import { Header } from "@/components/ui";

import styles from "../styles.module.scss";

export namespace InterestsPickerSearch {
    export type Props = Header.SearchProps;
}

export const InterestsPickerSearch = observer((props: InterestsPickerSearch.Props) => {
    const { store, config } = useInterestsPickerContext();

    return (
        <Header.Search
            value={store.searchTerm}
            className={styles.search__header}
            controlHref={config.callbackUrl}
            onChange={(e) => store.setSearchTerm(e.target.value)}
            {...props}
        />
    );
});