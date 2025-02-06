import { PropsWithChildren } from "react";
import { ProgressBar } from "@/components/shared";

export default function OnboardingLayout({ children }: PropsWithChildren) {
    return (
        <div style={{ paddingInline: 16 }}>
            <ProgressBar
                stepCount={4}
                currentStep={0}
            />
            { children }
        </div>
    );
}