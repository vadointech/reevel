

import { Container, Input } from "@/components/ui";
import { Place } from "../_components/place";
import styles from "./styles.module.scss";
import { ProgressBar } from "@/components/shared";
import { Back, IconClose } from "@/components/icons";
import { Search } from "@/components/icons/search";
import { LocationList } from "../_components/location-list";
import { Header } from "@/components/shared/header";

export default function Page() {

    const locations = [
        { city: "Vinn", country: "Vinnitsa, Ukraine" },
        { city: "Palo Alto", country: "8502 Preston Rd. Ingl..." },
        { city: "Bershad’", country: "Vinnitsa, Ukraine" },
        { city: "Vinn", country: "Vinnitsa, Ukraine" },
        { city: "Palo Alto", country: "8502 Preston Rd. Ingl..." },
        { city: "Bershad’", country: "Vinnitsa, Ukraine" },
        { city: "Vinn", country: "Vinnitsa, Ukraine" },
        { city: "Palo Alto", country: "8502 Preston Rd. Ingl..." },
        { city: "Bershad’", country: "Vinnitsa, Ukraine" },
        { city: "Vinn", country: "Vinnitsa, Ukraine" },
        { city: "Palo Alto", country: "8502 Preston Rd. Ingl..." },
        { city: "Bershad’", country: "Vinnitsa, Ukraine" },
        { city: "Bershad’", country: "Vinnitsa, Ukraine" },
        { city: "Vinn", country: "Vinnitsa, Ukraine" },
        { city: "Palo Alto", country: "8502 Preston Rd. Ingl..." },
        { city: "Bershad’", country: "Vinnitsa, Ukraine" },
    ];



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
                <LocationList locations={locations} />
            </Container>
        </div>
    );
}