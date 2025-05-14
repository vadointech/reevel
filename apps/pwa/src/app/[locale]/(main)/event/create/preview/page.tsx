import { Header } from "@/components/shared/_redesign";
import { IconArrowLeft } from "@/components/icons";
import { PreviewEventCarousel } from "../_components";

import styles from "./styles.module.scss";

export default function CreateEventPreviewPage() {
    return (
        <div className={styles.page}>
            <Header
                iconBefore={<IconArrowLeft />}
                className={styles.page__header}
            >
                Preview event
            </Header>
            <PreviewEventCarousel />
        </div>
    );
}