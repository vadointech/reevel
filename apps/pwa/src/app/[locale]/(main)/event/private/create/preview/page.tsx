import { Link } from "@/i18n/routing";
import { Header } from "@/components/shared/_redesign";
import { IconArrowLeft } from "@/components/icons";
import { PreviewEventCarousel } from "../../../_components";

import styles from "../styles.module.scss";

export default function CreateEventPreviewPage() {
    return (
        <div className={styles.page}>
            <Header
                className={styles.page__header}
                iconBefore={
                    <Link href={"/event/private/create"}>
                        <IconArrowLeft />
                    </Link>
                }
            >
                Preview event
            </Header>
            <PreviewEventCarousel
                callbackUrl={"/event/private/create"}
                cropperPageUrl={"/event/private/create/upload"}
                uploads={[]}
            />
        </div>
    );
}