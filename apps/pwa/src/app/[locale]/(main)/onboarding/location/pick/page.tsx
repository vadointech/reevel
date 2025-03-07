import { Container, Input } from "@/components/ui";
import { Search } from "@/components/icons/search";
import { OnboardingLocationPicker, OnboardingLocationPickerHeader } from "../_components";

import styles from "./styles.module.scss";

export default function Page() {
    return (
        <div className={styles.page}>
            <Container>
                <OnboardingLocationPickerHeader />
            </Container>

            <Container className={styles.page__input}>
                <Input variant="rounded" placeholder="Search events" background="muted" icon={<Search />} />
            </Container>

            <Container className={styles.page__places}>
                <OnboardingLocationPicker />
            </Container>
        </div>
    );
}