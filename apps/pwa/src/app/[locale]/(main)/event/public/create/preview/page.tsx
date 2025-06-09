import { Link } from "@/i18n/routing";
import { Header } from "@/components/shared/_redesign";
import { IconArrowLeft } from "@/components/icons";
import { PreviewEventCarousel } from "../../../_components";
import { getUserUploads } from "../../../../../../../api/user/uploads/get-uploads";
import { headers } from "next/headers";
import { SupportedFileCollections } from "@/entities/uploads";

import styles from "../styles.module.scss";

export default async function CreateEventPreviewPage() {

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
                    <Link href={"/event/public/create"}>
                        <IconArrowLeft />
                    </Link>
                }
            >
                Preview event
            </Header>
            <PreviewEventCarousel
                uploads={data || []}
                callbackUrl={"/event/public/create"}
                cropperPageUrl={"/event/public/create/upload"}
            />
        </div>
    );
}