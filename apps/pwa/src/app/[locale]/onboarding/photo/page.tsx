import { OnboardingTextBlock } from "../_components";
import { CircularCarousel } from "@/components/shared/circular-carousel/circular-carousel.component";

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function Page() {
    return (
        <div style={{ marginTop: 170 }}>
            <OnboardingTextBlock
                title={"Show Off Yourself!"}
                subtitle={"You can select photo from the list below or add you own photo as profile picture"}
            />

            <CircularCarousel
                items={months}
                itemWidth={146}
                itemHeight={4}
            />
        </div>
    );
}