import { observer } from "mobx-react-lite";
import { Header } from "@/components/shared/_redesign";
import { useInterestsPickerStore } from "@/features/interests/picker";
import styles from "../styles.module.scss";

export namespace InterestsPickerSearch {
    export type Props = Header.SearchProps;
}

export const InterestsPickerSearch = observer((props: InterestsPickerSearch.Props) => {
    const interestsPickerStore = useInterestsPickerStore();

    return (
        <Header.Search
            value={interestsPickerStore.searchTerm}
            className={styles.search__header}
            controlHref={"/event/create"}
            onChange={(e) => interestsPickerStore.setSearchTerm(e.target.value)}
            {...props}
        />
    );
});