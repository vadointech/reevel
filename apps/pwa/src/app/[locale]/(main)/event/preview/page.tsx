import { Header } from "@/components/shared/header";
import styles from "./styles.module.scss";
import { EventPreview } from "./_components/event-preview";
import { ArrowBack } from "@/components/icons";
import { Button } from "@/components/ui";




export default async function Page() {
    return (
        <div className={styles.page}>
            <EventPreview />
            <div className={styles.page__buttons}>
                <Button
                    variant="default"
                >
                    Change Poster
                </Button>
                <Button
                    variant="primary"
                    iconAfter={<ArrowBack />}
                    href="event/preview"
                >
                    Next step
                </Button>
            </div>
        </div>
    );
};