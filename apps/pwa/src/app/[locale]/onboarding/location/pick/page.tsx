import { Container, Input } from "@/components/ui";
import { IconClose } from "@/components/icons";
import { Search } from "@/components/icons/search";
import { OnboardingLocationPicker } from "../_components";
import { Header } from "@/components/shared/header";

import styles from "./styles.module.scss";

export default function Page() {
    return (
        <div className={styles.page}>
            <Container>
                <Header
                    title="Enter your location" size="large"
                    controlRight={<IconClose width={8} height={8} />}
                    controlRightType="button" />
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