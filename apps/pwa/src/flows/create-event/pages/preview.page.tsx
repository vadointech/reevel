import { getUserUploads } from "@/api/user/uploads";
import { headers } from "next/headers";
import { SupportedFileCollections } from "@/entities/uploads";
import { Header } from "@/components/shared/_redesign";
import { Link } from "@/i18n/routing";
import { IconArrowLeft } from "@/components/icons";
import { CreateEventPreview } from "@/flows/create-event/modules/preview";

import styles from "../styles/page.module.scss";

export namespace CreateEventPreviewPage {
    export type Props = {
        callbackUrl: string;
        cropperUrl: string;
    };
}

export async function CreateEventPreviewPage({ callbackUrl }: CreateEventPreviewPage.Props) {
    const { data } = await getUserUploads({
        nextHeaders: await headers(),
        params: {
            collection: SupportedFileCollections.EVENT_POSTER,
        },
    });

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
                uploads={data || []}
                callbackUrl={callbackUrl}
                cropperPageUrl={callbackUrl}
            />
        </div>
    );
}
