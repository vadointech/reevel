import { Header } from "@/components/shared/_redesign";
import { CreateEventForm } from "../_components";

import styles from "./styles.module.scss";
import { IconArrowLeft } from "@/components/icons";

export default function CreateEventPage() {
    return (
        <div className={styles.page}>
            <div className={styles.page__header}>
                <Header iconBefore={<IconArrowLeft />}>
                    Create event
                </Header>
            </div>

            <CreateEventForm />
        </div>
    );
}