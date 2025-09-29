import { Link } from "@/i18n/routing";

import { getCurrentUserInterests, getCurrentUserProfile } from "@/api/user/server";

import { Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";

import styles from "../styles/page.module.scss";
import { InterestEntity } from "@/entities/interests";
import { getInitialInterests } from "@/api/interests/server";
import { EditProfileForm } from "../modules/form";
import { getCurrentUserUploads } from "@/api/user/uploads/server";
import { SupportedFileCollections } from "@/entities/uploads";

export namespace EditProfileFormPage {
    export type Props = {
    };
}

export async function EditProfileFormPage({ }: EditProfileFormPage.Props) {
    const [currentUserInterests, user, uploads] = await Promise.all([
        getCurrentUserInterests(),
        getCurrentUserProfile(),
        getCurrentUserUploads({ collection: SupportedFileCollections.PROFILE_PICTURE }),
    ]);


    let interests: InterestEntity[] = [];

    if (currentUserInterests.length > 0) {
        interests = currentUserInterests;
    } else {
        const initialInterests = await getInitialInterests();
        interests = initialInterests.slice(0, 6);
    }

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
            <EditProfileForm user={user} interests={interests} uploads={uploads} />
        </div>
    );
}
