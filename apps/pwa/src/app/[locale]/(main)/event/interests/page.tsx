import { Container, Input } from "@/components/ui";

import styles from "./styles.module.scss";

import { searchInterests } from "@/api/interests";
import { InterestsSearch } from "./_components/interests-search/interests-search.component";


export default async function Page() {

    const { data: interests } = await searchInterests();




    return (
        <InterestsSearch initialInterests={interests ?? []} />
    );
};
