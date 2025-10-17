import { Link } from "@/i18n/routing";

import { Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";
import { CreateEventPreview } from "@/flows/create-event/modules/preview";

import styles from "../styles/page.module.scss";

export namespace CreateEventPreviewPage {
    export type Props = {
        callbackUrl: string;
        cropperUrl: string;
    };
}

export async function CreateEventPreviewPage({ callbackUrl, cropperUrl }: CreateEventPreviewPage.Props) {
    return (
        <div className={styles.page}>
            <Header
                className={styles.page__header}
                iconBefore={
                    <Link href={callbackUrl}>
                        <IconArrowLeft />
                    </Link>
                }
            >
                Preview event
            </Header>
            <CreateEventPreview
                callbackUrl={callbackUrl}
                cropperPageUrl={cropperUrl}
            />
        </div>
    );
}
