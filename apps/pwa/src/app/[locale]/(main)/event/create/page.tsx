import { Header } from "@/components/shared/_redesign";
import { IconArrowLeft } from "@/components/icons";
import { CreateEventForm } from "./_components";
import { getCurrentUserInterests } from "@/api/user/get-interests";
import { headers } from "next/headers";

import styles from "./styles.module.scss";

export default async function CreateEventPage() {

    const { data } = await getCurrentUserInterests({
        nextHeaders: await headers(),
    });

    const interests = data?.map(item => item.interest);

    return (
        <div className={styles.page}>
            <div className={styles.page__header}>
                <Header iconBefore={<IconArrowLeft />}>
                    Create event
                </Header>
            </div>

            <CreateEventForm
                interests={interests || []}
            />
        </div>
    );
}