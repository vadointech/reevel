
import { Button, Container } from "@/components/ui";
import { EventProgress } from "../_components/event-progress";
import { OnboardingTextBlock } from "../../onboarding/_components";
import { ArrowBack } from "@/components/icons";
import { PosterPicker } from "./_components/poster-picker";
import { EventPosterUploader } from "./_components/poster-uploader";

import styles from "./styles.module.scss";



const defaultPosters = [
    "http://localhost:3000/assets/temp/poster1.jpg",
    "http://localhost:3000/assets/temp/poster2.png",
    "http://localhost:3000/assets/temp/poster3.png",
    "http://localhost:3000/assets/temp/poster4.png",
    "http://localhost:3000/assets/temp/carousel2.jpg",
];

export default async function Page() {
    return (
        <>
            <Container>
                <EventProgress step={4} />

                <OnboardingTextBlock
                    title={"Show Off Your Event!"}
                    subtitle={"Choose or uploads a poster that perfectly represents your event."}
                    className={styles.page__textBlock}
                />
            </Container>

            <Container className={styles.page__content}>
                <PosterPicker defaultPosters={defaultPosters} />
            </Container>
            
            <Container className={styles.page__buttons}>
                <EventPosterUploader />

                <Button
                    variant="primary"
                    iconAfter={<ArrowBack />}
                >
                    Next step
                </Button>
            </Container>
        </>
    );
};