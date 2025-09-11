import { headers } from "next/headers";
import { Link } from "@/i18n/routing";

import { getCurrentUserUploads } from "@/api/user/server";

import { Header } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";
import { CreateEventPreview } from "@/flows/create-event/modules/preview";

import { SupportedFileCollections } from "@/entities/uploads";

import styles from "../styles/page.module.scss";

export namespace CreateEventPreviewPage {
    export type Props = {
        callbackUrl: string;
        cropperUrl: string;
    };
}

export async function CreateEventPreviewPage({ callbackUrl, cropperUrl }: CreateEventPreviewPage.Props) {
    const { data } = await getCurrentUserUploads({
        nextHeaders: await headers(),
        params: {
            collection: SupportedFileCollections.EVENT_POSTER,
        },
        cache: {
            tags: [SupportedFileCollections.EVENT_POSTER],
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
                cropperPageUrl={cropperUrl}
            />
        </div>
    );
}
