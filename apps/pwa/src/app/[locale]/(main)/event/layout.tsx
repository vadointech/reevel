import { PropsWithChildren } from "react";
import { ParamsWithLocale } from "@/types/common";
import { getUserProfile } from "@/api/profile/get-one";
import { headers } from "next/headers";

import styles from "./styles.module.scss";
import { CreateEventStoreProvider } from "@/features/event";
import { getAllInterest, getUserInterests } from "@/api/interests";

export const dynamic = "force-dynamic";

export default async function CreateEventLayout({ children, params }: PropsWithChildren<ParamsWithLocale>) {
    const { locale } = await params;

    const { data } = await getUserProfile({
        nextHeaders: await headers(),
    });


    return (
        <CreateEventStoreProvider init={[{}]}>
            <div className={styles.layout}>
                {children}
            </div>
        </CreateEventStoreProvider>
    );
}