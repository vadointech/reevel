import { OnboardingAvatarPicker, OnboardingTextBlock } from "../_components";

export default function Page() {
    return (
        <div style={{ marginTop: 170 }}>
            <OnboardingTextBlock
                title={"Show Off Yourself!"}
                subtitle={"You can select photo from the list below or add you own photo as profile picture"}
            />

            <OnboardingAvatarPicker />
        </div>
    );
}