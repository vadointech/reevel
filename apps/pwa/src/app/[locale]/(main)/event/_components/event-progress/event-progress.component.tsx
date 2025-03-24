"use client";

import { ProgressBar } from "@/components/shared";

export namespace EventProgress {
    export type Props = {
        step: number;
    };
}

export const EventProgress = ({ step }: EventProgress.Props) => {

    return (
        <ProgressBar
            stepCount={1}
            currentStep={step}
            type={"close"}
        // onControlRightClick={ }
        // onControlLeftClick={}
        />
    );
};
