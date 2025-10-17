import { EditProfileForm } from "../modules/form";
import { EditProfileFormHeader } from "../modules/page-header";

import styles from "../styles/page.module.scss";

export namespace EditProfileFormPage {
    export type Props = never;
}

export async function EditProfileFormPage() {
    return (
        <div className={styles.page}>
            <div className={styles.page__header}>
                <EditProfileFormHeader />
            </div>
            <EditProfileForm />
        </div>
    );
}
