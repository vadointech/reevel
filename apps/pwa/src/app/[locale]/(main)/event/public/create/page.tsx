import { Link } from "@/i18n/routing";
import { Header } from "@/components/shared/_redesign";
import { IconArrowLeft } from "@/components/icons";
import { CreatePublicEventForm } from "../../_components";
import { getCurrentUserInterests } from "@/api/user/get-interests";
import { headers } from "next/headers";
import { InterestEntity } from "@/entities/interests";
import { getInitialInterests } from "@/api/interests";

import styles from "./styles.module.scss";

export default async function CreateEventPage() {

    const { data } = await getCurrentUserInterests({
        nextHeaders: await headers(),
    });

    let interests: InterestEntity[] = [];

    if(data && data.length > 0) {
        interests = data.map(item => item.interest);
    } else {
        const { data } = await getInitialInterests({
            nextHeaders: await headers(),
        });
        if(data) {
            interests = data.slice(0, 6);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.page__header}>
                <Header
                    iconBefore={
                        <Link href={"/"}>
                            <IconArrowLeft />
                        </Link>
                    }
                >
                    Create event
                </Header>
            </div>

            <CreatePublicEventForm interests={interests} />
        </div>
    );
}