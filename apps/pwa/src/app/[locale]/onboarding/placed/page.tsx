

import { Place } from "../_components/place";
import styles from "./styles.module.scss";

export default function Page() {
    return (
        <div className={styles.page}>
            <Place city="Vinnitsa" country="Vinnitsa, Ukraine" />
        </div>
    );
}