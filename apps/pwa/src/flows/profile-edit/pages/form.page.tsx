import { headers } from "next/headers";
import { Link } from "@/i18n/routing";

import { getCurrentUserInterests, getCurrentUserProfile } from "@/api/user/server";

import { Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";

import styles from "../styles/page.module.scss";

export namespace EditProfileFormPage {
    export type Props = {
    };
}

export async function EditProfileFormPage({ }: EditProfileFormPage.Props) {
    const { data: user } = await getCurrentUserProfile({
        nextHeaders: await headers(),
    });



    try {
        const { data } = await getCurrentUserInterests({
            nextHeaders: await headers(),
        });
        console.log(data);

    } catch {
        console.log('err');
    }


    // let interests: InterestEntity[] = [];

    // if (data && data.length > 0) {
    //     interests = data.map(item => item.interest);
    // } else {
    //     const { data } = await getInitialInterests({
    //         nextHeaders: await headers(),
    //     });
    //     if (data) {
    //         interests = data.slice(0, 6);
    //     }
    // }

    return (
        <div className={styles.page}>
            <div className={styles.page__header}>
                <Header
                    iconAfter={<div>Save</div>}
                    iconBefore={
                        <Link href={"/apps/pwa/public"}>
                            <IconArrowLeft />
                        </Link>
                    }
                >
                    Edit profile
                </Header>
            </div>
            {/* <EditProfileForm user={user} interests={interests} /> */}
        </div>
    );
}
