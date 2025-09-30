
import { getCurrentUserInterests } from "@/api/user/server";

import { EditProfileForm } from "../modules/form";
import { getCurrentUserUploads } from "@/api/user/uploads/server";
import { SupportedFileCollections } from "@/entities/uploads";
import { EditProfileFormHeader } from "../modules/page-header";

import styles from "../styles/page.module.scss";

export namespace EditProfileFormPage {
    export type Props = {};
}

export async function EditProfileFormPage({ }: EditProfileFormPage.Props) {
    const [currentUserInterests, uploads] = await Promise.all([
        getCurrentUserInterests(),
        getCurrentUserUploads({ collection: SupportedFileCollections.PROFILE_PICTURE }),
    ]);


    return (
        <div className={styles.page}>
            <div className={styles.page__header}>
                <EditProfileFormHeader />
            </div>
            <EditProfileForm interests={currentUserInterests} uploads={uploads} />
        </div>
    );
}
