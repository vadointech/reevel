import { observer } from "mobx-react-lite";
import { Header } from "@/components/shared/_redesign";
import { useInterestsSearch } from "@/features/interests/interests-picker/hooks/use-search.hook";
import styles from "../styles.module.scss";

export namespace InterestsPickerSearch {
    export type Props = Header.SearchProps;
}

export const InterestsPickerSearch = observer((props: InterestsPickerSearch.Props) => {
    const {
        searchTerm,
        handleChange,
    } = useInterestsSearch();

    return (
        <Header.Search
            value={searchTerm}
            className={styles.search__header}
            controlHref={"/event/create"}
            onChange={handleChange}
            {...props}
        />
    );
});