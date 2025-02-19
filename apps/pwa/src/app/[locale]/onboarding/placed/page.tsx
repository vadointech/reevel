

import { Container, Input } from "@/components/ui";
import { Place } from "../_components/place";
import styles from "./styles.module.scss";
import { ProgressBar } from "@/components/shared";
import { Back } from "@/components/icons";
import { PlacesList } from "../_components/places-list";

export default function Page() {

    const locations = [
        { city: "Vinn", country: "Vinnitsa, Ukraine" },
        { city: "Palo Alto", country: "8502 Preston Rd. Ingl..." },
        { city: "Bershad’", country: "Vinnitsa, Ukraine" },
    ];



    return (
        <div className={styles.page}>
            <Container>
                <ProgressBar
                    stepCount={4}
                    currentStep={0}
                    text={'Enter your location'}
                    mode="text"
                    type="shortBack"
                />
            </Container>
            <Container className={styles.page__input}>
                <Input variant="rounded" placeholder="Search events" background="muted" icon={<Back />} />
            </Container>
            <Container>
                <PlacesList locations={locations} />
            </Container>
        </div>
    );
}