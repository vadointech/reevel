import { ComponentType } from "react";

import { Link } from "@/i18n/routing";

import { getInitialInterests } from "@/api/interests/server";
import { getCurrentUserInterests } from "@/api/user/server";

import { Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";

import { EventVisibility } from "@/entities/event";
import { InterestEntity } from "@/entities/interests";

import styles from "../styles/page.module.scss";

export namespace CreateEventFormPage {
    export type Props = {
        type: EventVisibility
    };
}

export async function CreateEventFormPage({ type }: CreateEventFormPage.Props) {
    const currentUserInterests = await getCurrentUserInterests();

    let interests: InterestEntity[] = [];

    if(currentUserInterests.length > 0) {
        interests = currentUserInterests;
    } else {
        const initialInterests = await getInitialInterests();
        interests = initialInterests.slice(0, 6);
    }

    let FormComponent: ComponentType<{ interests: InterestEntity[] }>;

    switch(type) {
        case EventVisibility.PUBLIC:
            FormComponent = await import("../modules/form").then(modules => modules.CreatePublicEventForm);
            break;
        case EventVisibility.PRIVATE:
            FormComponent = await import("../modules/form").then(modules => modules.CreatePrivateEventForm);
            break;
        default:
            FormComponent = await import("../modules/form").then(modules => modules.CreatePrivateEventForm);
    }

    return (
        <div className={styles.page}>
            <div className={styles.page__header}>
                <Header
                    iconBefore={
                        <Link href={"/discover"}>
                            <IconArrowLeft />
                        </Link>
                    }
                >
                    Create event
                </Header>
            </div>
            <FormComponent interests={interests} />
        </div>
    );
}
