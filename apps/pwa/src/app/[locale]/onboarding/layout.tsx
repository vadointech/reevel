import { PropsWithChildren } from "react";

export default function OnboardingLayout({ children }: PropsWithChildren) {
    return (
        <div className={"h-full"}>
            { children }
        </div>
    );
}