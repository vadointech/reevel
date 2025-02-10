import { getTranslations } from "next-intl/server";
import { CarouselLayout } from "./_components/carousel";
import styles from "./styles.module.scss";




export default async function Home() {

    const t = await getTranslations();

    return (
        <div className={styles.test}>
            <CarouselLayout>
            </CarouselLayout>
        </div>
    );
}
