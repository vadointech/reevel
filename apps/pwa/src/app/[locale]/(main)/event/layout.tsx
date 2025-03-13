import { PropsWithChildren } from "react";
import { ParamsWithLocale } from "@/types/common";
import { getUserProfile } from "@/api/profile/get-one";
import { redirect } from "@/i18n/routing";
import { headers } from "next/headers";

import styles from "./styles.module.scss";
import { CreateEventStoreProvider } from "@/features/onboarding/stores/event-create.store";

export const dynamic = "force-dynamic";

export default async function CreateEventLayout({ children, params }: PropsWithChildren<ParamsWithLocale>) {
    const { locale } = await params;

    const { data } = await getUserProfile({
        nextHeaders: await headers(),
    });

    // const onboardingStatus = data?.completed;

    // if (onboardingStatus === "true") {
    //     return redirect({
    //         href: "/",
    //         locale,
    //     });
    // }

    return (
        <CreateEventStoreProvider
            init={[{
                title: '',
                description: '',
                poster: '',
                interests: [],
                location: data?.location?.coordinates,
            }]}
        >
            <div className={styles.layout}>
                {children}
            </div>
        </CreateEventStoreProvider>
    );
}